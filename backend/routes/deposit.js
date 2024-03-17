const { Wallet, providers, utils } = require('ethers')
var express = require('express');
const router = express.Router();

const {
  EthBridger,
  getL2Network,
  EthDepositStatus,
  addDefaultLocalNetwork,
} = require('@arbitrum/sdk')



async function deposit(req) {

  const { amount } = req.body;
  const walletPrivateKey = process.env.PRIVATE_KEY

  const l1Provider = new providers.JsonRpcProvider(process.env.L1RPC)
  const l2Provider = new providers.JsonRpcProvider(process.env.L2RPC)

  const l1Wallet = new Wallet(walletPrivateKey, l1Provider)
  const l2Wallet = new Wallet(walletPrivateKey, l2Provider)

  addDefaultLocalNetwork()

  const l2Network = await getL2Network(l2Provider)
  const ethBridger = new EthBridger(l2Network)

  const l2WalletInitialEthBalance = await l2Wallet.getBalance()


  const depositTx = await ethBridger.deposit({
    amount: utils.parseEther(amount),
    l1Signer: l1Wallet,
    l2Provider: l2Provider,
  })

  const depositRec = await depositTx.wait()
  console.warn('deposit L1 receipt is:', depositRec.transactionHash)

  console.warn('Now we wait for L2 side of the transaction to be executed ⏳')
  const l2Result = await depositRec.waitForL2(l2Provider)

  l2Result.complete
    ? console.log(
      `L2 message successful: status: ${EthDepositStatus[await l2Result.message.status()]
      }`
    )
    : console.log(
      `L2 message failed: status ${EthDepositStatus[await l2Result.message.status()]
      }`
    )


  const l2WalletUpdatedEthBalance = await l2Wallet.getBalance()
  console.log(
    `your L2 ETH balance is updated from ${l2WalletInitialEthBalance.toString()} to ${l2WalletUpdatedEthBalance.toString()}`
  )

}
router.post('/', async function (req, res, next) {


  deposit(req);

  res.send("Your crypto will be deposited in 15 mins.")

});

module.exports = router;
