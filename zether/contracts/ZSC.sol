pragma solidity ^0.5.4; // unexplainable problems when switch to 0.5.5

import './ZKP.sol';

contract ERC20Interface {
  function transfer(address to, uint256 value) external returns (bool);

  function transferFrom(address from, address to, uint256 value) public returns (bool);
}

contract ZSC {
    ERC20Interface coin;
    ZKP zkp;
    uint256 public epochLength;

    uint256 bTotal = 0; // could use erc20.balanceOf(this), but (even pure / view) calls cost gas during EVM execution
    uint256 constant MAX = 4294967295; // 2^32 - 1 // no sload for constants...!
    mapping(bytes32 => bytes32[2][2]) public acc; // main account mapping
    mapping(bytes32 => bytes32[2][2]) public pTransfers; // storage for pending transfers
    mapping(bytes32 => address) ethAddrs; // this can probably become private soon.
    mapping(bytes32 => uint256) public lastRollOver; // had this but killed it, reviving
    bytes32[] nonceSet; // would be more natural to use a mapping, but they can't be deleted / reset!
    uint256 lastGlobalUpdate = 0; // will be also used as a proxy for "current epoch", seeing as rollovers will be anticipated
    // not implementing account locking for now...revisit

    event RegistrationOccurred(bytes32[2] registerer, address addr);
    event FundOccurred();
    event BurnOccurred();
    event TransferOccurred(bytes32[2][] parties); // i guess all parties will be notified, and the client can sort out whether it was real or not.
    // no more RollOverOccurred. also, actually the argument was never used for fund and burn? killed now.
    // i guess it's still necessary for transfers---not even so much to know when you received a transfer, as to know when you got rolled over.

    constructor(address _coin, address _zkp, uint256 _epochLength) public {
        coin = ERC20Interface(_coin);
        zkp = ZKP(_zkp);
        epochLength = _epochLength;
    }

    function rollOver(bytes32 yHash) internal {
        uint256 e = block.number / epochLength;
        if (lastRollOver[yHash] < e) { // consider replacing with a "time-based" approach
            // changed the logic here, must check / test this
            bytes32[2][2][2] memory scratch = [acc[yHash], pTransfers[yHash]];
            assembly {
                let result := 1
                let m := mload(0x40)
                mstore(m, mload(mload(mload(scratch))))
                mstore(add(m, 0x20), mload(add(mload(mload(scratch)), 0x20)))
                mstore(add(m, 0x40), mload(mload(mload(add(scratch, 0x20)))))
                mstore(add(m, 0x60), mload(add(mload(mload(add(scratch, 0x20))), 0x20)))
                result := and(result, call(gas, 0x06, 0, m, 0x80, mload(mload(scratch)), 0x40))
                mstore(m, mload(mload(add(mload(scratch), 0x20))))
                mstore(add(m, 0x20), mload(add(mload(add(mload(scratch), 0x20)), 0x20)))
                mstore(add(m, 0x40), mload(mload(add(mload(add(scratch, 0x20)), 0x20))))
                mstore(add(m, 0x60), mload(add(mload(add(mload(add(scratch, 0x20)), 0x20)), 0x20)))
                result := and(result, call(gas, 0x06, 0, m, 0x80, mload(add(mload(scratch), 0x20)), 0x40))
                if iszero(result) {
                    revert(0, 0)
                }
            }
            acc[yHash] = scratch[0];
            pTransfers[yHash] = [[bytes32(0), bytes32(0)], [bytes32(0), bytes32(0)]];
            lastRollOver[yHash] = e;
        }
        if (lastGlobalUpdate < e) {
            lastGlobalUpdate = e;
            delete nonceSet;
        }
    }

    function register(bytes32[2] calldata y) external { // keeping this as is
        bytes32 yHash = keccak256(abi.encodePacked(y));
        bytes32[2][2] memory scratch = acc[yHash];
        require((scratch[0][0] | scratch[0][1] | scratch[1][0] | scratch[1][1]) == 0x00, "Account already registered.");
        ethAddrs[yHash] = msg.sender; // eth address will be _permanently_ bound to y
        // warning: front-running danger. client should verify that he was not front-run before depositing funds to y!
        assembly {
            calldatacopy(mload(scratch), 0x04, 0x40) // copy contents of y to first inner array of scratch
            mstore(mload(add(scratch, 0x20)), 0x077da99d806abd13c9f15ece5398525119d11e11e9836b2ee7d23f6159ad87d4)
            mstore(add(mload(add(scratch, 0x20)), 0x20), 0x01485efa927f2ad41bff567eec88f32fb0a0f706588b4e41a8d587d008b7f875)
            // account of y is now [y, g] = ElG_y(e, 1). sentinel for having registered
        }
        acc[yHash] = scratch;
        emit RegistrationOccurred(y, msg.sender); // client must use this event callback to confirm.
    }

    function fund(bytes32[2] calldata y, uint256 bTransfer) external {
        bytes32 yHash = keccak256(abi.encodePacked(y));
        rollOver(yHash);

        // registration check here would be redundant, as any `transferFrom` the 0 address will necessarily fail. save an sload
        require(bTransfer <= MAX, "Deposit amount out of range."); // uint, so other way not necessary?
        require(bTransfer + bTotal <= MAX, "Fund pushes contract past maximum value.");
        // if pTransfers[yHash] == [0, 0, 0, 0] then an add and a write will be equivalent...
        bytes32[2] memory scratch = acc[yHash][0];
        // won't let me assign this array using literals / casts
        assembly {
            let m := mload(0x40)
            let result := 1
            mstore(m, mload(scratch))
            mstore(add(m, 0x20), mload(add(scratch, 0x20)))
            mstore(add(m, 0x40), 0x077da99d806abd13c9f15ece5398525119d11e11e9836b2ee7d23f6159ad87d4)
            mstore(add(m, 0x60), 0x01485efa927f2ad41bff567eec88f32fb0a0f706588b4e41a8d587d008b7f875)
            mstore(add(m, 0x80), bTransfer) // b will hopefully be a primitive / literal and not a pointer / address?
            result := and(result, call(gas, 0x07, 0, add(m, 0x40), 0x60, add(m, 0x40), 0x40))
            result := and(result, call(gas, 0x06, 0, m, 0x80, scratch, 0x40))
            if iszero(result) {
                revert(0, 0)
            }
        }
        acc[yHash][0] = scratch;
        require(coin.transferFrom(ethAddrs[yHash], address(this), bTransfer), "Transfer from sender failed.");
        // front-running here would be disadvantageous, but still prevent it here by using ethAddrs[yHash] instead of msg.sender
        // also adds flexibility: can later issue messages from arbitrary ethereum accounts.
        bTotal += bTransfer;
        emit FundOccurred();
    }

    function transfer(bytes32[2][] memory L, bytes32[2] memory R, bytes32[2][] memory y, bytes32[2] memory u, bytes memory proof) public {
        uint256 size = y.length;
        bytes32[2][] memory CLn = new bytes32[2][](size);
        bytes32[2][] memory CRn = new bytes32[2][](size);
        require(L.length == size, "Input array length mismatch!");
        uint256 result = 1;
        for (uint256 i = 0; i < y.length; i++) {
            bytes32 yHash = keccak256(abi.encodePacked(y[i]));
            rollOver(yHash);
            bytes32[2][2] memory scratch = pTransfers[yHash];
            assembly {
                let m := mload(0x40)
                mstore(m, mload(mload(scratch)))
                mstore(add(m, 0x20), mload(add(mload(scratch), 0x20)))
                // calldatacopy(add(m, 0x40), add(0x104, mul(i, 0x40)), 0x40) // copy L[i] onto running block
                // having to change external --> public to avoid stacktoodeep
                // as a result, have to use the below two lines instead of the above single line.
                mstore(add(m, 0x40), mload(mload(add(add(L, 0x20), mul(i, 0x20)))))
                mstore(add(m, 0x60), mload(add(mload(add(add(L, 0x20), mul(i, 0x20))), 0x20)))
                result := and(result, call(gas, 0x06, 0, m, 0x80, mload(scratch), 0x40))
                mstore(m, mload(mload(add(scratch, 0x20))))
                mstore(add(m, 0x20), mload(add(mload(add(scratch, 0x20)), 0x20)))
                // calldatacopy(add(m, 0x40), 0x24, 0x40) // copy R onto running block
                mstore(add(m, 0x40), mload(R))
                mstore(add(m, 0x60), mload(add(R, 0x20)))
                result := and(result, call(gas, 0x06, 0, m, 0x80, mload(add(scratch, 0x20)), 0x40))
            }
            pTransfers[yHash] = scratch; // credit / debit / neither y's account.
            scratch = acc[yHash];
            assembly {
                let m := mload(0x40)
                mstore(m, mload(mload(scratch)))
                mstore(add(m, 0x20), mload(add(mload(scratch), 0x20)))
                mstore(add(m, 0x40), mload(mload(add(add(L, 0x20), mul(i, 0x20)))))
                mstore(add(m, 0x60), mload(add(mload(add(add(L, 0x20), mul(i, 0x20))), 0x20)))
                result := and(result, call(gas, 0x06, 0, m, 0x80, mload(add(add(CLn, 0x20), mul(i, 0x20))), 0x40))
                mstore(m, mload(mload(add(scratch, 0x20))))
                mstore(add(m, 0x20), mload(add(mload(add(scratch, 0x20)), 0x20)))
                mstore(add(m, 0x40), mload(R))
                mstore(add(m, 0x60), mload(add(R, 0x20)))
                result := and(result, call(gas, 0x06, 0, m, 0x80, mload(add(add(CRn, 0x20), mul(i, 0x20))), 0x40))
            }
        }
        require(result == 1, "Elliptic curve operations failure. Bad points?");

        // warning: no check that recipients are registered accounts, i.e., that _every_ y has been registered to.
        // make sure that you register your eth account to your pubkey before receiving funds (unless you're using a throwaway, see below).
        // if you don't, your registration could be pre-empted by an adversary, necessitating that you further transfer before withdrawing
        // if this pre-empt goes unnoticed, and the further transfer is _not_ taken prior to withdrawal, then you'll lose funds
        // this is a design decision: could require everyone to be registered...? but this would dampen anonymity a bit. i.e., throwaways
        // it would be more convenient to not have to register a (new, random) eth account to each throwaway you make.
        // sure, an adversary could latch on to your throwaway, but you were going to transfer it back to your main account anyway, so who cares?
        // thus the burden is thus now on you, the _recipient_, to make sure you (successfully) register before receiving funds,
        // and if you don't and re pre-empted / front-run, to _notice_ and to transfer to a new account before withdrawing
        // this won't be an issue in practice, as the client software will _force_ you to register right away when your public key is generated,
        // and will notify you if the process is compromised.

        bool seen = false;
        bytes32 uHash = keccak256(abi.encodePacked(u));
        for (uint256 i = 0; i < nonceSet.length; i++) {
            if (nonceSet[i] == uHash) {
                seen = true;
                break;
            }
        }
        require(!seen, "Nonce already seen!");
        require(zkp.verifyTransfer(CLn, CRn, L, R, y, lastGlobalUpdate, u, proof), "Transfer proof verification failed!");

        nonceSet.push(uHash);
        emit TransferOccurred(y);
    }

    function burn(bytes32[2] memory y, uint256 bTransfer, bytes32[2] memory u, bytes memory proof) public {
        bytes32 yHash = keccak256(abi.encodePacked(y));
        rollOver(yHash);

        require(ethAddrs[yHash] != address(0), "Unregistered account!"); // not necessary for safety, but will prevent accidentally withdrawing to the 0 address
        require(0 <= bTransfer && bTransfer <= MAX, "Transfer amount out of range.");
        bytes32[2][2] memory scratch = acc[yHash]; // could technically use sload, but... let's not go there.
        assembly {
            let result := 1
            let m := mload(0x40)
            mstore(m, mload(mload(scratch)))
            mstore(add(m, 0x20), mload(add(mload(scratch), 0x20)))
            // load bulletproof generator here
            mstore(add(m, 0x40), 0x077da99d806abd13c9f15ece5398525119d11e11e9836b2ee7d23f6159ad87d4) // g_x
            mstore(add(m, 0x60), 0x01485efa927f2ad41bff567eec88f32fb0a0f706588b4e41a8d587d008b7f875) // g_y
            mstore(add(m, 0x80), sub(0x30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f0000001, bTransfer))
            result := and(result, call(gas, 0x07, 0, add(m, 0x40), 0x60, add(m, 0x40), 0x40))
            result := and(result, call(gas, 0x06, 0, m, 0x80, mload(scratch), 0x40)) // scratch[0] = acc[yHash][0] * g ^ -b, scratch[1] doesn't change
            if iszero(result) {
                revert(0, 0)
            }
        }
        bool seen = false;
        bytes32 uHash = keccak256(abi.encodePacked(u));
        for (uint256 i = 0; i < nonceSet.length; i++) {
            if (nonceSet[i] == uHash) { // does this have to repeat the sload for each iteration?!? revisit
                seen = true;
                break;
            }
        }
        require(!seen, "Nonce already seen!");
        require(zkp.verifyBurn(scratch[0], scratch[1], y, bTransfer, lastGlobalUpdate, u, proof), "Burn proof verification failed!");
        require(coin.transfer(ethAddrs[yHash], bTransfer), "This shouldn't fail... Something went severely wrong.");
        // note: change from Zether spec. should use bound address not msg.sender, to prevent "front-running attack".
        acc[yHash] = scratch; // debit y's balance
        bTotal -= bTransfer;
        nonceSet.push(uHash);
        emit BurnOccurred();
    }
}
