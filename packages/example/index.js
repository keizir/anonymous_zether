const Web3 = require("web3");
const Client = require("../anonymous.js/src/client");
const ZSC = require("../contract-artifacts/artifacts/ZSC.json");
const Deployer = require('./deployer.js');

(async () => {
    const web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:23000"));
    var deployer = new Deployer(web3);

    web3.transactionConfirmationBlocks = 1;
    const zether = await deployer.deployZetherVerifier().contractAddress;
    const burn = await deployer.deployBurnVerifier().contractAddress;
    const cash = await deployer.deployCashToken().contractAddress;
    await deployer.mintCashToken(cash);
    const zsc = await deployer.deployZSC(cash, zether, burn, 2220).contractAddress;
    await deployer.approveCashToken(cash, zsc)
    const deployed = new web3.eth.Contract(ZSC.abi, zsc);

    const accounts = await web3.eth.getAccounts();
    const client = new Client(deployed, accounts[0], web3);
    await client.account.initialize();
    await client.deposit(10000);
    await client.withdraw(1000);
    client.friends.addFriend("Alice", ['0x0eaadaaa84784811271240ec2f03b464015082426aa13a46a99a56c964a5c7cc', '0x173ce032ad098e9fcbf813696da92328257e58827f3600b259c42e52ff809433']);
    await client.transfer('Alice', 1000);
})();