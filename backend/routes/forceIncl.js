const { Wallet, providers, utils } = require('ethers')
var express = require('express');
const router = express.Router();

const {
    getL2Network,
    getL1Network,
    addDefaultLocalNetwork,
} = require('@arbitrum/sdk')


const { Bridge__factory } = require('@arbitrum/sdk/dist/lib/abi/factories/Bridge__factory')
const { BigNumber }= require('@ethersproject/bignumber')

const { InboxTools }= require('@arbitrum/sdk')
const {SequencerInbox__factory}= require("@arbitrum/sdk/dist/lib/abi/factories/SequencerInbox__factory")
const { Inbox__factory } = require('@arbitrum/sdk/dist/lib/abi/factories/Inbox__factory');



const submitL2Tx = async (
    tx,
    l2Network,
    l1Signer
  ) => {
    const inbox = Inbox__factory.connect(l2Network.ethBridge.inbox, l1Signer)
  
    return await inbox.sendUnsignedTransaction(
      tx.gasLimit,
      tx.gasPriceBid,
      tx.nonce,
      tx.to,
      tx.value || BigNumber.from(21000000000),
      tx.data || '0x'
    )
  }
  

const setup = async () => {

    const walletPrivateKey = process.env.PRIVATE_KEY

    const l1Provider = new providers.JsonRpcProvider(process.env.L1RPC)
    const l2Provider = new providers.JsonRpcProvider(process.env.L2RPC)

    const l1Wallet = new Wallet(walletPrivateKey, l1Provider)
    const l2Wallet = new Wallet(walletPrivateKey, l2Provider)


    addDefaultLocalNetwork()

    const signer = l1Wallet
    const provider = signer.provider


    const arbitrumOne = await getL2Network(l2Provider)
    const l1network = await getL1Network(l1Provider)


    const sequencerInbox = SequencerInbox__factory.connect(
        arbitrumOne.ethBridge.sequencerInbox,
        provider
    )

    const bridge = Bridge__factory.connect(
        arbitrumOne.ethBridge.bridge,
        provider
    )


    return {
        l1Signer: signer,
        l1Provider: provider,
        l2Network: arbitrumOne,
        sequencerInbox,
        bridge,
        l2Wallet
    }
}


async function ForceIncl(req) {

    const {data,to,value,gasLimitPercentage} = req.body;

    
  const { l1Signer, l2Network, sequencerInbox, bridge } = await setup() 

  const inboxTools = new InboxTools(l1Signer, l2Network)
  console.log("Initiating Transaction")

  const l2Tx = await submitL2Tx(
    {
      to: await l1Signer.getAddress(),
      value: BigNumber.from(0),
      gasLimit: BigNumber.from(100000),
      gasPriceBid: BigNumber.from(21000000000),
      nonce: 0,
    },
    l2Network,
    l1Signer
  )
  await l2Tx.wait()
  // const forceInclusionTx = await inboxTools.forceInclude()
  // await forceInclusionTx!.wait()
  console.log("Transaction successfully settled")
}
router.post('/', async function (req, res, next) {


    ForceIncl(req);

    res.send("Your crypto will be deposited in 15 mins.")

});

module.exports = router;
