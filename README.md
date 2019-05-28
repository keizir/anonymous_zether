**WARNING**: The security of this cryptographic protocol has not yet been formally proven. This repository should not be considered suitable for production use.

# Anonymous Zether

This is a private payment system, an _anonymous_ extension of Bünz, Agrawal, Zamani and Boneh's [Zether protocol](https://crypto.stanford.edu/~buenz/papers/zether.pdf).

The outlines of an anonymous approach are sketched in the authors' original manuscript. We develop an explicit proof protocol for this extension, described in the technical note [AnonZether.pdf](docs/AnonZether.pdf). We also providge a full implementation of the anonymous protocol (including a proof generator, verification contracts, and a client / front-end).

Thanks go to Benedikt Bünz for discussions around this, as well as for basic Zether. Also, Sergey Vasilyev's [range proof contracts](https://github.com/leanderdulac/BulletProofLib/blob/master/truffle/contracts/RangeProofVerifier.sol) served as a starting point for our [Zether verification contracts](packages/protocol/contracts).

### Folders in this repo

[prover](prover) is a Maven project, which spins up a Java service capable of generating zero-knowledge proofs. This service uses [our fork of](https://github.com/jpmorganchase/BulletProofLib) [Benedikt Bünz's Bulletproofs library](https://github.com/bbuenz/BulletProofLib) as an external dependency.

The [packages](packages) folder contains the ZSC (Zether Smart Contract) and auxiliary contracts, as well as scripts to interact with it from the `geth` console.

### User Instructions

#### Setting things up
- Spin up a Quorum cluster (e.g., follow the steps of [the 7nodes example](https://github.com/jpmorganchase/quorum-examples/tree/master/examples/7nodes)).
- Start the Spring application inside the `/prover` directory of this repo. The easiest way to do this is to import the Maven project into an IDE, and execute `zkp/src/main/java/zkp/App.java`.
- In the main directory, type `yarn`.

An automated demo can then be run by typing
```bash
node packages/example
```
while in the main directory.

#### Detailed usage example

Let's assume that `Client` has been imported and that all contracts have been deployed, as in https://github.com/jpmorganchase/anonymous-zether/blob/master/packages/example/index.js#L14-L24. In four separate `node` consoles, point `web3` to four separate Quorum nodes (make sure to use WebSocket or IPC providers); for each one, call
```javascript
web3.eth.getAccounts().then((accounts) => { console.log(accounts[accounts.length - 1]); })
```
to print the public key of an unlocked account. Assign this value to the variable `home`.

In the first window, Alice's let's say, execute
```javascript
> var alice = new Client(deployedZSC, home, web3);
> alice.account.initialize();
Promise { <pending> }
Initiating registration (txHash = "0x3420c7ec482391ddaf349742bacc30ac26a5eba92dd1828f95499c5909c572b3").
Registration successful.
```
and in Bob's,
```javascript
> var bob = new Client(deployedZSC, home, web3);
> bob.account.initialize();
```
Do something similar for the other two.

The two methods `deposit` and `withdraw` take a single numerical parameter. For example, in Alice's window, type
```javascript
> alice.deposit(100)
Promise { <pending> }
Deposit submitted (txHash = "0xa6e4c2d415dda9402c6b20a6b1f374939f847c00d7c0f206200142597ff5be7e").
Deposit of 100 was successful. Balance now 100.
```
If this doesn't work, make sure that your deployments, as well as your minting and approval operations, went through properly.

Now, make sure that the Java prover is running in the background, and then type
```javascript
> alice.withdraw(10)
Initiating withdrawal.
Promise { <pending> }
Withdrawal submitted (txHash = "0xd7cd5de1680594da89823a18c0b74716b6953e23fe60056cc074df75e94c92c5").
Withdrawal of 10 was successful. Balance now 90.
```
In Bob's window, use
```javascript
> bob.account.keypair['y']
[
  '0x17f5f0daab7218a462dea5f04d47c9db95497833381f502560486d4019aec495',
  '0x0957b7a0ec24a779f991ea645366b27fe3e93e996f3e7936bdcfb7b18d41a945'
]
```
to retrieve his public key and add Bob as a "friend" of Alice, i.e.
```javascript
> alice.friends.addFriend("Bob", ['0x17f5f0daab7218a462dea5f04d47c9db95497833381f502560486d4019aec495', '0x0957b7a0ec24a779f991ea645366b27fe3e93e996f3e7936bdcfb7b18d41a945'])
'Friend added.'
```
You can now do
```javascript
> alice.transfer("Bob", 20)
Initiating transfer.
Promise { <pending> }
Transfer submitted (txHash = "0x4c0631483e6ea89d2068c90d5a2f9fa42ad12a102650ff80b887542e18e1d988").
Transfer of 20 was successful. Balance now 70.
```
In Bob's window, you should see:
```javascript
Transfer of 20 received! Balance now 20.
```
You can also add Alice, Carol and Dave as friends of Bob. Now, you can try:
```javascript
> bob.transfer("Alice", 10, ["Carol", "Dave"])
Initiating transfer.
Promise { <pending> }
Transfer submitted (txHash = "0x9b3f51f3511c6797789862ce745a81d5bdfb00304831a8f25cc8554ea7597860").
Transfer of 10 was successful. Balance now 10.
```

The meaning of this syntax is that Carol and Dave are being included, along with Bob and Alice, in Bob's transaction's _anonymity set_. As a consequence, _no outside observer_ will be able to distinguish, among the four participants, who sent funds, who received funds, and how much was transferred. The account balances of all four participants are also private.

In fact, you can see for yourself the perspective of Eve---an eavesdropper, let's say. In a new window (if you want), execute:

```javascript
> var inputs = deployedZSC.jsonInterface.abi.methods.transfer.abiItem.inputs
> var parsed
> web3.eth.getBlock('latest').then((block) => web3.eth.getTransaction(block.transactions[0])).then((transaction) => parsed = web3.eth.abi.decodeParameters(inputs, "0x" + transaction.input.slice(10)))
```
You will see a bunch of fields; in particular, `parsed['y']` will contain the list of public keys, while `parsed['L']`, `parsed['R']` and `parsed['proof']` will contain further bytes which conjecturally reveal nothing about the transaction.

Keep in mind that there are a few obvious situations where information can be determined. For example, if someone who has never deposited before appears in a transaction for the first time (this was the case of Bob earlier above), then it will be clear that this person was not the transaction's originator. Similarly, if a certain person has performed only deposits and withdrawals, then his account balance will obviously be visible.

More subtly, some information could be leaked if you choose your anonymity sets poorly. Thus, make sure you know how this works before using it.
