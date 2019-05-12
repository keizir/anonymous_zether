**WARNING**: The security of this cryptographic protocol has not yet been formally proven. This repository should not be considered suitable for production use.

# Anonymous Zether

This is a private payment system, an _anonymous_ extension of Bünz, Agrawal, Zamani and Boneh's [Zether protocol](https://crypto.stanford.edu/~buenz/papers/zether.pdf).

The outlines of an anonymous approach are sketched in the authors' original manuscript. We develop an explicit proof protocol for this extension, described in the technical note [AnonZether.pdf](AnonZether.pdf). We also provide a full implementation of the anonymous protocol (including a proof generator, verification contracts, and a client / front-end).

Thanks go to Benedikt Bünz for discussions around this, as well as for basic Zether. Also, Sergey Vasilyev's [range proof contracts](https://github.com/leanderdulac/BulletProofLib/blob/master/truffle/contracts/RangeProofVerifier.sol) served as a starting point for our [Zether verification contracts](zether/contracts).

### Folders in this repo

[zkp](zkp) is a Maven project, which spins up a Java service capable of generating zero-knowledge proofs. This service uses [our fork of](https://github.com/jpmorganchase/BulletProofLib) [Benedikt Bünz's Bulletproofs library](https://github.com/bbuenz/BulletProofLib) as an external dependency. It is designed to be used with a [modified version of Quorum](https://github.com/jpmorganchase/quorum/tree/anonymous), which automates communication with this Java service.

The [zether](zether) folder contains the ZSC (Zether Smart Contract) and auxiliary contracts, as well as scripts to interact with it from the `geth` console.

### User Instructions

#### Setting things up
- Build the above-linked `anonymous` branch of Quorum.
- Spin up a Quorum cluster (e.g., follow the steps of [the 7nodes example](https://github.com/jpmorganchase/quorum-examples/tree/master/examples/7nodes)).
- Start the Spring application inside the `/zkp` directory of this repo. The easiest way to do this is to import the Maven project into an IDE, and execute `zkp/src/main/java/zkp/App.java`.

#### Usage Example
The first thing we're going to need is a running ERC20 contract, for which (at least) one of the participating nodes has a balance. I won't go through the steps here; in short, you can compile [OpenZeppelin's ERC20Mintable](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/token/ERC20/ERC20Mintable.sol) contract, deploy it, and then mint yourself some funds. I'll assume that this has already been done, and that the contract resides at the address `erc20mintableAddress = erc20mintable.address`.

In separate windows, let's attach to four of the 7 nodes---Alice, Bob, Charlie, and Eve, let's say. In all windows, execute
```javascript
> loadScript('../../../BulletProofPOC/zether/tracker.js')
```
In one of these windows (doesn't matter which), deploy the main Zether "ZSC" contract using
```javascript
> demo.deployZSC(erc20mintableAddress)
"Deploying contracts."
> ZSC deployed at address "0x64adf24051beb1b867c5a04a5dc7dd643d8da40e".
```
Recover this contract in all _other_ windows by executing:
```javascript
> demo.recoverZSC(zscAddress)
"Recovered."
```
where the value `zscAddress` is copied from the address you saw in the original window.

In the first window, Alice's let's say, execute
```javascript
> var alice = new tracker()
> Initial registration successful.
```
and in Bob's,
```javascript
> var bob = new tracker()
> Initial registration successful.
```
Do something similar for the other two.

The two methods `deposit` and `withdraw` take a single numerical parameter. For example, in Alice's window, where `eth.accounts[0]` has funds (and has approved `zsc` to transfer them on its behalf!), type
```javascript
> alice.deposit(100)
"Initiating deposit."
> Deposit of 100 was successful. Balance is now 100.
```
and then
```javascript
> alice.withdraw(10)
"Initiating withdrawal."
> Withdrawal of 10 was successful. Balance is now 90.
```
In Bob's window, use
```javascript
> bob.me()
["0x2e9a19152b4c625d05cd36a6dd43f03e54ff0e76cdc01a4aaa1099174c2f327c", "0x27f3c0d1a6eac40021b128f37c4dd943a8e9d48b6f8070a1c72439d2ce8baf9f"]
```
to retrieve his public key and add Bob as a "friend" of Alice, i.e.
```javascript
> alice.friend("Bob", ["0x2e9a19152b4c625d05cd36a6dd43f03e54ff0e76cdc01a4aaa1099174c2f327c", "0x27f3c0d1a6eac40021b128f37c4dd943a8e9d48b6f8070a1c72439d2ce8baf9f"])
"Friend added."
```
You can now do
```javascript
> alice.transfer("Bob", 20)
"Initiating transfer."
> Transfer of 20 was successful. Balance now 70.
```
In Bob's window, you should see:
```javascript
> Transfer of 20 received! New balance is 20.
```
You can also add Alice, Charlie and Eve as friends of Bob. Now, you can try:
```javascript
> bob.transfer("Alice", 10, ["Charlie", "Eve"])
"Initiating transfer."
> Transfer of 10 was successful. Balance now 10.
```

The meaning of this syntax is that Charlie and Eve are being included, along with Bob and Alice, in Bob's transaction's _anonymity set_. As a consequence, _no outside observer_ will be able to distinguish, among the four participants, who sent funds, who received funds, and how much was transferred. The account balances of all four participants are also private.

In fact, you can see for yourself the perspective of Eve---the eavesdropper, let's say:

```javascript
> eth.getTransaction(eth.getBlock('latest').transactions[0])
```
The resulting transaction's `input` field will contain a bunch of bytes (parsable using web3 1.0), which conjecturally reveal nothing about the transaction.

Keep in mind that there are a few obvious situations where information can be determined. For example, if someone who has never deposited before appears in a transaction for the first time (this was the case of Bob earlier above), then it will be clear that this person was not the transaction's originator. Similarly, if a certain person has performed only deposits and withdrawals, then his account balance will obviously be visible.

More subtly, some information could be leaked if you choose your anonymity sets poorly. Thus, make sure you know how this works before using it.
