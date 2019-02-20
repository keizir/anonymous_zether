// =================================
// START: Web3 deploy code
// =================================

/* beautify ignore:start */
var zscContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"outL","type":"bytes32[2]"},{"name":"inL","type":"bytes32[2]"},{"name":"inOutR","type":"bytes32[2]"},{"name":"y","type":"bytes32[2]"},{"name":"yBar","type":"bytes32[2]"},{"name":"proof","type":"bytes"},{"name":"signature","type":"bytes32[3]"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"ethAddrs","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"y","type":"bytes32[2]"},{"name":"bTransfer","type":"uint256"}],"name":"fund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"acc","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"ctr","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"pTransfers","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"y","type":"bytes32[2]"},{"name":"bTransfer","type":"uint256"},{"name":"proof","type":"bytes"},{"name":"signature","type":"bytes32[3]"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"y","type":"bytes32[2]"}],"name":"rollOver","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"domainHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_coin","type":"address"},{"name":"_chainId","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"roller","type":"bytes32[2]"}],"name":"RollOverOccurred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"funder","type":"bytes32[2]"}],"name":"FundOccurred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"burner","type":"bytes32[2]"}],"name":"BurnOccurred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"bytes32[2]"}],"name":"TransferFrom","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"bytes32[2]"},{"indexed":false,"name":"recipient","type":"bytes32[2]"}],"name":"TransferTo","type":"event"}]);
/* beautify ignore:end */

// =================================
// END: Web3 deploy code
// =================================

var _chainId = 10;

function _deployZSC(coin) {
    // =================================
    // START: Web3 deploy code
    // =================================
    var zsc = zscContract.new(
        coin,
        _chainId, {
            from: web3.eth.accounts[0],
            data: '0x6080604052604051620000129062000196565b604051809103906000f0801580156200002f573d6000803e3d6000fd5b50600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060006003553480156200008257600080fd5b5060405160408062002b2e83398101806040526040811015620000a457600080fd5b810190808051906020019092919080519060200190929190505050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060006040517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81527fc9d54de6bfed12ed581fc7d2c1ae5f8778aaf7c177d117fdbb15c71c94be6f8860208201527fae209a0b48f21c054280f2455d32cf309387644879d9acbd8ffc199163811885604082015282606082015230608082015260a0812091505080600181905550505050620001a4565b6104c3806200266b83390190565b6124b780620001b46000396000f3fe608060405234801561001057600080fd5b50600436106100b0576000357c01000000000000000000000000000000000000000000000000000000009004806373edb37b1161008357806373edb37b1461026757806380a25373146102a9578063ba909191146102ff578063d246fda014610396578063dfe86ac5146103c4576100b0565b8063151c4d8d146100b557806342b30cd61461016b5780635464befb146101d95780635b7f82f414610211575b600080fd5b61016960048036036101c08110156100cc57600080fd5b8101908080604001909192919290806040019091929192908060400190919291929080604001909192919290806040019091929192908035906020019064010000000081111561011b57600080fd5b82018360208201111561012d57600080fd5b8035906020019184600183028401116401000000008311171561014f57600080fd5b9091929391929390806060019091929192905050506103e2565b005b6101976004803603602081101561018157600080fd5b8101908080359060200190929190505050610bb9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61020f600480360360608110156101ef57600080fd5b810190808060400190919291929080359060200190929190505050610bec565b005b6102516004803603606081101561022757600080fd5b81019080803590602001909291908035906020019092919080359060200190929190505050611115565b6040518082815260200191505060405180910390f35b6102936004803603602081101561027d57600080fd5b810190808035906020019092919050505061114e565b6040518082815260200191505060405180910390f35b6102e9600480360360608110156102bf57600080fd5b81019080803590602001909291908035906020019092919080359060200190929190505050611166565b6040518082815260200191505060405180910390f35b610394600480360360e081101561031557600080fd5b8101908080604001909192919290803590602001909291908035906020019064010000000081111561034657600080fd5b82018360208201111561035857600080fd5b8035906020019184600183028401116401000000008311171561037a57600080fd5b90919293919293908060600190919291929050505061119f565b005b6103c2600480360360408110156103ac57600080fd5b8101908080604001909192919290505050611843565b005b6103cc611c8f565b6040518082815260200191505060405180910390f35b600085604051602001808260026020028082843780830192505050915050604051602081830303815290604052805190602001209050600085604051602001808260026020028082843780830192505050915050604051602081830303815290604052805190602001209050610456612232565b60046000848152602001908152602001600020600280602002604051908101604052809291906000905b828210156104d9578382600202016002806020026040519081016040528092919082600280156104c5576020028201915b8154815260200190600101908083116104b1575b505050505081526020019060010190610480565b5050505090506001604051825151815260208351015160208201526040600460408301377f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f000000060808201526040808201606060408401600060075af18216915060408351608083600060065af1821691506020830151518152602080840151015160208201526040608460408301377f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f000000060808201526040808201606060408401600060075af18216915060406020840151608083600060065af1821691508115156105c257600080fd5b5050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ea59a87f82600060028110151561061157fe5b602002015183600160028110151561062557fe5b60200201518e8e8e8e8e8e8e6040518a63ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808a600260200280838360005b8381101561068757808201518184015260208101905061066c565b5050505090500189600260200280838360005b838110156106b557808201518184015260208101905061069a565b5050505090500188600260200280828437600081840152601f19601f82011690508083019250505087600260200280828437600081840152601f19601f82011690508083019250505086600260200280828437600081840152601f19601f82011690508083019250505085600260200280828437600081840152601f19601f82011690508083019250505084600260200280828437600081840152601f19601f820116905080830192505050806020018281038252848482818152602001925080828437600081840152601f19601f8201169050808301925050509a505050505050505050505060206040518083038186803b1580156107b457600080fd5b505afa1580156107c8573d6000803e3d6000fd5b505050506040513d60208110156107de57600080fd5b81019080805190602001909291905050501515610863576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260168152602001807f696e76616c6964207472616e736665722070726f6f660000000000000000000081525060200191505060405180910390fd5b61098483886002806020026040519081016040528092919082600260200280828437600081840152601f19601f8201169050808301925050505050508d6002806020026040519081016040528092919082600260200280828437600081840152601f19601f8201169050808301925050505050508d6002806020026040519081016040528092919082600260200280828437600081840152601f19601f8201169050808301925050505050508d6002806020026040519081016040528092919082600260200280828437600081840152601f19601f820116905080830192505050505050896003806020026040519081016040528092919082600360200280828437600081840152601f19601f820116905080830192505050505050611c95565b80600460008581526020019081526020016000209060026109a6929190612260565b5060056000838152602001908152602001600020600280602002604051908101604052809291906000905b82821015610a2a57838260020201600280602002604051908101604052809291908260028015610a16576020028201915b815481526020019060010190808311610a02575b5050505050815260200190600101906109d1565b50505050905060016040518251518152602083510151602082015260406044604083013760408351608083600060065af18216915060208301515181526020808401510151602082015260406084604083013760406020840151608083600060065af182169150811515610a9d57600080fd5b50508060056000848152602001908152602001600020906002610ac1929190612260565b5060076000848152602001908152602001600020600081548092919060010191905055507fbd24f8f2c91e1635142f713e573e2d57ca34de67e93613c543acfb868d3ae9c4886040518082600260200280828437600081840152601f19601f82011690508083019250505091505060405180910390a17f65a1a9163fd6bf6f27780b37e8789f9e3a31ddee65f4f28c3ab1c0fab2ee83bd88886040518083600260200280828437600081840152601f19601f82011690508083019250505082600260200280828437600081840152601f19601f8201169050808301925050509250505060405180910390a15050505050505050505050565b60066020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000826040516020018082600260200280828437808301925050509150506040516020818303038152906040528051906020012090506401000000006003548301101515610c85576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260288152602001806124156028913960400191505060405180910390fd5b600060076000838152602001908152602001600020541415610d0d57336006600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160076000838152602001908152602001600020819055505b610d15612232565b604080519081016040528060408051908101604052806000600102815260200160006001028152508152602001604080519081016040528060006001028152602001600060010281525081525090506040517f077da99d806abd13c9f15ece5398525119d11e11e9836b2ee7d23f6159ad87d481527f01485efa927f2ad41bff567eec88f32fb0a0f706588b4e41a8d587d008b7f875602082015283604082015260408251606083600060075af11515610dce57600080fd5b50600560008381526020019081526020016000206000600281101515610df057fe5b60020201600280602002604051908101604052809291908260028015610e2b576020028201915b815481526020019060010190808311610e17575b5050505050816001600281101515610e3f57fe5b60200201819052506040518151518152602082510151602082015260208201515160408201526020808301510151606082015260408251608083600060065af11515610e8a57600080fd5b50806000600281101515610e9a57fe5b6020020151600560008481526020019081526020016000206000600281101515610ec057fe5b60020201906002610ed29291906122b0565b506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd6006600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1630866040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b158015610ffe57600080fd5b505af1158015611012573d6000803e3d6000fd5b505050506040513d602081101561102857600080fd5b810190808051906020019092919050505015156110ad576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f5472616e736665722066726f6d2073656e646572206661696c6564000000000081525060200191505060405180910390fd5b826003600082825401925050819055507fee09cc7fa61426187b532bb1fee93c0642109da02bcd9cfae5525c1df14ded96846040518082600260200280828437600081840152601f19601f82011690508083019250505091505060405180910390a150505050565b60046020528260005260406000208260028110151561113057fe5b600202018160028110151561114157fe5b0160009250925050505481565b60076020528060005260406000206000915090505481565b60056020528260005260406000208260028110151561118157fe5b600202018160028110151561119257fe5b0160009250925050505481565b600085604051602001808260026020028082843780830192505050915050604051602081830303815290604052805190602001209050846000111580156111ea575064010000000085105b151561125e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f5472616e7366657220616d6f756e74206f7574206f662072616e67650000000081525060200191505060405180910390fd5b611266612232565b60046000838152602001908152602001600020600280602002604051908101604052809291906000905b828210156112e9578382600202016002806020026040519081016040528092919082600280156112d5576020028201915b8154815260200190600101908083116112c1575b505050505081526020019060010190611290565b5050505090506001604051825151815260208351015160208201527f077da99d806abd13c9f15ece5398525119d11e11e9836b2ee7d23f6159ad87d460408201527f01485efa927f2ad41bff567eec88f32fb0a0f706588b4e41a8d587d008b7f8756060820152877f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000010360808201526040808201606060408401600060075af18216915060408351608083600060065af1821691508115156113aa57600080fd5b5050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f43fd09c8260006002811015156113f957fe5b602002015183600160028110151561140d57fe5b60200201518a8a8a8a6040518763ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018087600260200280838360005b8381101561146c578082015181840152602081019050611451565b5050505090500186600260200280838360005b8381101561149a57808201518184015260208101905061147f565b5050505090500185600260200280828437600081840152601f19601f820116905080830192505050848152602001806020018281038252848482818152602001925080828437600081840152601f19601f82011690508083019250505097505050505050505060206040518083038186803b15801561151857600080fd5b505afa15801561152c573d6000803e3d6000fd5b505050506040513d602081101561154257600080fd5b810190808051906020019092919050505015156115c7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f696e76616c6964206275726e2070726f6f66000000000000000000000000000081525060200191505060405180910390fd5b6116098287856003806020026040519081016040528092919082600360200280828437600081840152601f19601f820116905080830192505050505050611f9c565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb6006600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16886040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561170057600080fd5b505af1158015611714573d6000803e3d6000fd5b505050506040513d602081101561172a57600080fd5b81019080805190602001909291905050501515611792576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260348152602001806123e16034913960400191505060405180910390fd5b80600460008481526020019081526020016000209060026117b4929190612260565b506007600083815260200190815260200160002060008154809291906001019190505550856003600082825403925050819055507fc4f538d91f144975b9e9d73db4fb5881b5373593b10c8d16c02546accae806f0876040518082600260200280828437600081840152601f19601f82011690508083019250505091505060405180910390a150505050505050565b6000816040516020018082600260200280828437808301925050509150506040516020818303038152906040528051906020012090506006600082815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611932576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260288152602001806124646028913960400191505060405180910390fd5b61193a6122f0565b60806040519081016040528060046000858152602001908152602001600020600060028110151561196757fe5b600202016002806020026040519081016040528092919082600280156119a2576020028201915b81548152602001906001019080831161198e575b505050505081526020016005600085815260200190815260200160002060006002811015156119cd57fe5b60020201600280602002604051908101604052809291908260028015611a08576020028201915b8154815260200190600101908083116119f4575b50505050508152602001600460008581526020019081526020016000206001600281101515611a3357fe5b60020201600280602002604051908101604052809291908260028015611a6e576020028201915b815481526020019060010190808311611a5a575b50505050508152602001600560008581526020019081526020016000206001600281101515611a9957fe5b60020201600280602002604051908101604052809291908260028015611ad4576020028201915b815481526020019060010190808311611ac0575b5050505050815250905060016040518251518152602083510151602082015260208301515160408201526020808401510151606082015260408351608083600060065af1821691506040830151518152602060408401510151602082015260608301515160408201526020606084015101516060820152604080840151608083600060065af182169150811515611b6a57600080fd5b50506040805190810160405280826000600481101515611b8657fe5b60200201518152602001826002600481101515611b9f57fe5b602002015181525060046000848152602001908152602001600020906002611bc8929190612260565b50604080519081016040528060408051908101604052806000600102815260200160006001028152508152602001604080519081016040528060006001028152602001600060010281525081525060056000848152602001908152602001600020906002611c37929190612260565b507f32d5319a46863eb82eacf55828338d265f5eea9b15a8d5c77bdaeea16ff34e4c836040518082600260200280828437600081840152601f19601f82011690508083019250505091505060405180910390a1505050565b60015481565b60006001549050600080600760008a815260200190815260200160002054905060606040805190810160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a333200000000815250905060405161190181528460208201527fa749c2b2aa979f63aed9ba228701786d8f263ff542fe87003a0ec711252431fe60408201528951606082015260208a0151608082015260406060820120606082015288516080820152602089015160a0820152604060808201206080820152875160a0820152602088015160c0820152604060a082012060a0820152865160c0820152602087015160e0820152604060c082012060c08201528260e082015260c0604082012060408201526042601e8201209350506000600182856040516020018083805190602001908083835b602083101515611df15780518252602082019150602081019050602083039250611dcc565b6001836020036101000a0380198251168184511680821785525050505050509050018281526020019250505060405160208183030381529060405280519060200120876000600381101515611e4257fe5b602002015160019004886001600381101515611e5a57fe5b6020020151896002600381101515611e6e57fe5b602002015160405160008152602001604052604051808581526020018460ff1660ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015611eca573d6000803e3d6000fd5b505050602060405103519050600660008c815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515611f8f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602781526020018061243d6027913960400191505060405180910390fd5b5050505050505050505050565b600060015490506000806007600087815260200190815260200160002054905060606040805190810160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a333200000000815250905060405161190181528460208201527f9d72b69945fb58354dfc76c7c1408fc89879b343a0105554190526fc4171d45560408201528660608201528260808201526060604082012060408201526042601e8201209350506000600182856040516020018083805190602001908083835b60208310151561208a5780518252602082019150602081019050602083039250612065565b6001836020036101000a03801982511681845116808217855250505050505090500182815260200192505050604051602081830303815290604052805190602001208760006003811015156120db57fe5b6020020151600190048860016003811015156120f357fe5b602002015189600260038110151561210757fe5b602002015160405160008152602001604052604051808581526020018460ff1660ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015612163573d6000803e3d6000fd5b5050506020604051035190506006600089815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515612228576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602781526020018061243d6027913960400191505060405180910390fd5b5050505050505050565b6080604051908101604052806002905b61224a61231f565b8152602001906001900390816122425790505090565b8260028002810192821561229f579160200282015b8281111561229e5782518290600261228e929190612341565b5091602001919060020190612275565b5b5090506122ac9190612381565b5090565b82600281019282156122df579160200282015b828111156122de5782518255916020019190600101906122c3565b5b5090506122ec91906123ad565b5090565b610100604051908101604052806004905b61230961231f565b8152602001906001900390816123015790505090565b6040805190810160405280600290602082028038833980820191505090505090565b8260028101928215612370579160200282015b8281111561236f578251825591602001919060010190612354565b5b50905061237d91906123ad565b5090565b6123aa91905b808211156123a6576000818161239d91906123d2565b50600201612387565b5090565b90565b6123cf91905b808211156123cb5760008160009055506001016123b3565b5090565b90565b50600081556001016000905556fe546869732073686f756c646e2774206661696c2e2e2e20536f6d657468696e672077656e74207365766572656c792077726f6e6746756e642070757368657320636f6e74726163742070617374206d6178696d756d2076616c75652e5369676e617475726520696e76616c6964206f7220666f722077726f6e6720616464726573732e4e6f207065726d697373696f6e20746f20726f6c6c206f7665722074686973206163636f756e742ea165627a7a723058204e7a2a74eb1642e111f80b2c12f93aae5b55216bd8097877e9182e1b4ecbae1a0029608060405234801561001057600080fd5b506104a3806100206000396000f3fe608060405234801561001057600080fd5b5060043610610053576000357c010000000000000000000000000000000000000000000000000000000090048063ea59a87f14610058578063f43fd09c14610130575b600080fd5b61011660048036036101e081101561006f57600080fd5b8101908080604001909192919290806040019091929192908060400190919291929080604001909192919290806040019091929192908060400190919291929080604001909192919290803590602001906401000000008111156100d257600080fd5b8201836020820111156100e457600080fd5b8035906020019184600183028401116401000000008311171561010657600080fd5b90919293919293905050506101ea565b604051808215151515815260200191505060405180910390f35b6101d0600480360361010081101561014757600080fd5b81019080806040019091929192908060400190919291929080604001909192919290803590602001909291908035906020019064010000000081111561018c57600080fd5b82018360208201111561019e57600080fd5b803590602001918460018302840111640100000000831117156101c057600080fd5b9091929391929390505050610332565b604051808215151515815260200191505060405180910390f35b6000806060600973ffffffffffffffffffffffffffffffffffffffff16600036604051808383808284378083019250505092505050600060405180830381855afa9150503d806000811461025a576040519150601f19603f3d011682016040523d82523d6000602084013e61025f565b606091505b509150915081801561030e575060017f01000000000000000000000000000000000000000000000000000000000000000281601f81518110151561029f57fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b1561031e57600192505050610325565b6000925050505b9998505050505050505050565b6000806060600a73ffffffffffffffffffffffffffffffffffffffff16600036604051808383808284378083019250505092505050600060405180830381855afa9150503d80600081146103a2576040519150601f19603f3d011682016040523d82523d6000602084013e6103a7565b606091505b5091509150818015610456575060017f01000000000000000000000000000000000000000000000000000000000000000281601f8151811015156103e757fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b156104665760019250505061046d565b6000925050505b969550505050505056fea165627a7a723058208cdf0c2ea172f0da01fce83623d956b61fbda338d5fb228bd03766530c7155110029',
            gas: '4700000'
        },
        function(e, contract) {
            if (typeof contract.address !== 'undefined') {
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
            }
        })
    // =================================
    // END: Web3 deploy code
    // =================================
    return zsc;
}

function _recoverZSC(address) {
    var zsc = zscContract.at(address);
    return zsc;
}

var demo = (function() {
    return {
        deployZSC: function(coin) {
            return _deployZSC(coin);
        },
        recoverZSC: function(address) {
            return _recoverZSC(address);
        },
    };
})();


function tracker(zsc) {
    this.zsc = zsc;
    this.balance = 0; // reflects WOULD-BE value in acc (i.e., if rollOver were called). do not touch this manually
    // had to make it public only so that it could be modified by callbacks. don't change it yourself!

    var that = this;
    var keypair = zether.createAccount(); // private
    var yHash = web3.sha3(keypair['y'][0].slice(2) + keypair['y'][1].slice(2), { encoding: 'hex' });
    var friends = {};

    zsc.TransferTo(function(error, event) { // automatically watch for incoming transfers
        if (error) {
            console.log("Error: " + error);
        } else {
            if (that.mine(event.args['recipient'])) {
                var sender = "unknown address " + event.args['sender'];
                for (var name in friends) {
                    if (friends[name][0] == event.args['sender'][0] && friends[name][1] == event.args['sender'][1]) {
                        sender = name;
                        break;
                    }
                }
                // var difference = peek - that.balance;
                console.log("Transfer received from " + sender + "! New balance is " + that.peek() + ".");
                // hard actually to report the net new value.
                // agree... and the balance mismatch with current account is causing proof to fail
                // i add a current account balance read everytime before transfer/withdraw to fix it
            }
        }
    });

    // these sign functions are specialized and ad-hoc. todo: implement general EIP-712.
    var signTransfer = function(yBar, outL, inL, inOutR) {
        var domainHash = that.zsc.domainHash().slice(2)
        var typeHash = 'a749c2b2aa979f63aed9ba228701786d8f263ff542fe87003a0ec711252431fe' // keccak256 hash of "ZETHER_TRANSFER_SIGNATURE(bytes32[2] yBar,bytes32[2] inL,bytes32[2] outL, bytes32[2] inOutR,uint256 count)"
        var yBarHash = web3.sha3(yBar[0].slice(2) + yBar[1].slice(2), { encoding: 'hex' }).slice(2)
        var outLHash = web3.sha3(outL[0].slice(2) + outL[1].slice(2), { encoding: 'hex' }).slice(2)
        var inLHash = web3.sha3(inL[0].slice(2) + inL[1].slice(2), { encoding: 'hex' }).slice(2)
        var inOutRHash = web3.sha3(inOutR[0].slice(2) + inOutR[1].slice(2), { encoding: 'hex' }).slice(2)
        var count = web3.padLeft(web3.toHex(that.zsc.ctr(yHash)).slice(2), 64)
        var hashStruct = web3.sha3(typeHash + yBarHash + outLHash + inLHash + inOutRHash + count, { encoding: 'hex' }).slice(2)
        var message = web3.sha3("1901" + domainHash + hashStruct, { encoding: 'hex' })
        var signature = web3.eth.sign(eth.accounts[0], message).slice(2)
        return ["0x00000000000000000000000000000000000000000000000000000000000000" + signature.slice(128), "0x" + signature.slice(0, 64), "0x" + signature.slice(64, 128)]
    }

    var signBurn = function(value) {
        var domainHash = that.zsc.domainHash().slice(2)
        var typeHash = '9d72b69945fb58354dfc76c7c1408fc89879b343a0105554190526fc4171d455' // keccak256 hash of "ZETHER_BURN_SIGNATURE(uint256 bTransfer,uint256 count)"
        var value = web3.padLeft(web3.toHex(value).slice(2), 64)
        var count = web3.padLeft(web3.toHex(that.zsc.ctr(yHash)).slice(2), 64)
        var hashStruct = web3.sha3(typeHash + value + count, { encoding: 'hex' }).slice(2)
        var message = web3.sha3("1901" + domainHash + hashStruct, { encoding: 'hex' })
        var signature = web3.eth.sign(eth.accounts[0], message).slice(2)
        return ["0x00000000000000000000000000000000000000000000000000000000000000" + signature.slice(128), "0x" + signature.slice(0, 64), "0x" + signature.slice(64, 128)]
    }

    this.me = function() {
        return keypair.y
    }

    this.secret = function() {
        return keypair.x;
    }

    this.mine = function(address) { // only used by callbacks...
        return address[0] == keypair['y'][0] && address[1] == keypair['y'][1];
    }

    this.friend = function(name, address) {
        friends[name] = address;
        return "Friend added.";
    }

    this.peek = function() { // read-only, incorporates not-yet-rolled-over receipts.
        var acc = [
            [this.zsc.acc(yHash, 0, 0), this.zsc.acc(yHash, 0, 1)],
            [this.zsc.acc(yHash, 1, 0), this.zsc.acc(yHash, 1, 1)]
        ];
        var pTransfers = [
            [this.zsc.pTransfers(yHash, 0, 0), this.zsc.pTransfers(yHash, 0, 1)],
            [this.zsc.pTransfers(yHash, 1, 0), this.zsc.pTransfers(yHash, 1, 1)]
        ];
        var result = [zether.add(acc[0], pTransfers[0]), zether.add(acc[1], pTransfers[1])];
        return zether.readBalance(result[0], result[1], keypair['x'], this.balance, this.balance + 1000000); // hardcoded range...?
        // ^^^ i start scanning at balance instead of at 0 to get a faster return. this needs to be brute-forced, and yet...
        // we know in advance that this.balance must be an under-estimate of full balance (including pendings)
        // so it's faster to start here. this will mattter in practice if balances are very high, e.g. already 100000 or so
    }

    this.reset = function() { // reset this.balance to current account
        var acc = [
            [this.zsc.acc(yHash, 0, 0), this.zsc.acc(yHash, 0, 1)],
            [this.zsc.acc(yHash, 1, 0), this.zsc.acc(yHash, 1, 1)]
        ];
        this.balance = zether.readBalance(acc[0], acc[1], keypair['x'], this.balance, this.balance + 1000000);
        // return this.balance; // return value never used?
    }

    this.deposit = function(value) {
        var peek = this.peek();
        var events = this.zsc.FundOccurred();
        events.watch(function(error, event) {
            if (error) {
                console.log("Error: " + error);
            } else {
                if (that.mine(event.args['funder'])) {
                    console.log("Deposit of " + value + " was successful. Balance is now " + (peek + value) + ".");
                    events.stopWatching();
                }
            }
        });

        this.zsc.fund(keypair['y'], value, { from: eth.accounts[0], gas: 5470000 });
        return "Initiating deposit.";
    }

    this.transfer = function(name, value) {
        var peek = this.peek();
        if (value > this.balance) {
            if (value > peek) {
                throw "Requested transfer amount of " + value + " exceeds available balance of " + peek + ".";
            } else {
                var events = this.zsc.RollOverOccurred();
                events.watch(function(error, event) {
                    if (error) {
                        console.log("Error: " + error);
                    } else {
                        if (that.mine(event.args['roller'])) {
                            // that.balance = peek; // warning: peek could become out-of-date for rapid calls?!?
                            that.reset();
                            events.stopWatching();
                            that.transfer(name, value);
                        }
                    }
                });
                this.zsc.rollOver(keypair['y'], { from: eth.accounts[0], gas: 5470000 });
                return "Initiating transfer.";
            }
        }
        var acc = [
            [this.zsc.acc(yHash, 0, 0), this.zsc.acc(yHash, 0, 1)],
            [this.zsc.acc(yHash, 1, 0), this.zsc.acc(yHash, 1, 1)]
        ];
        var proof = zether.proveTransfer(acc[0], acc[1], keypair['y'], friends[name], keypair['x'], value, this.balance - value);
        var signature = signTransfer(friends[name], proof['outL'], proof['inL'], proof['inOutR']);
        var events = this.zsc.TransferFrom();
        events.watch(function(error, event) {
            if (error) {
                console.log("Error: " + error);
            } else {
                if (that.mine(event.args['sender'])) {
                    that.balance -= value;
                    console.log("Transfer of " + value + " was successful. Balance now " + (peek - value) + ".");
                    events.stopWatching();
                }
            }
        });
        this.zsc.transfer(proof['outL'], proof['inL'], proof['inOutR'], keypair['y'], friends[name], proof['proof'], signature, { from: eth.accounts[0], gas: 5470000 });
        return "Initiating transfer.";
    }

    this.withdraw = function(value) {
        var peek = this.peek();
        if (value > this.balance) {
            if (value > peek) {
                throw "Requested transfer amount of " + value + " exceeds available balance of " + peek + "."
            } else {
                var events = this.zsc.RollOverOccurred();
                events.watch(function(error, event) {
                    if (error) {
                        console.log("Error: " + error);
                    } else {
                        if (that.mine(event.args['roller'])) {
                            // that.balance = peek;
                            that.reset();
                            events.stopWatching();
                            that.withdraw(value);
                        }
                    }
                });
                this.zsc.rollOver(keypair['y'], { from: eth.accounts[0], gas: 5470000 });
                return "Initiating withdrawal.";
            }
        }
        var acc = [
            [this.zsc.acc(yHash, 0, 0), this.zsc.acc(yHash, 0, 1)],
            [this.zsc.acc(yHash, 1, 0), this.zsc.acc(yHash, 1, 1)]
        ];
        var proof = zether.proveBurn(acc[0], acc[1], keypair['y'], value, keypair['x'], this.balance - value);
        var signature = signBurn(value);
        var events = this.zsc.BurnOccurred();
        events.watch(function(error, event) {
            if (error) {
                console.log("Error: " + error);
            } else {
                if (that.mine(event.args['burner'])) {
                    that.balance -= value;
                    console.log("Withdrawal of " + value + " was successful. Balance now " + (peek - value) + ".");
                    events.stopWatching();
                }
            }
        });
        this.zsc.burn(keypair['y'], value, proof, signature, { from: eth.accounts[0], gas: 5470000 });
        return "Initiating withdrawal.";
    }

    this.zsc.fund(keypair['y'], 0, { from: eth.accounts[0], gas: 5470000 }); // dummy "registration" deposit
}