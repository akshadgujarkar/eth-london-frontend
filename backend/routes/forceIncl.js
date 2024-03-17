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

    const { l1Signer, l2Network, sequencerInbox, bridge,l2Wallet } = await setup()

    console.log(await l1Signer.getAddress())

    const inboxTools = new InboxTools(l1Signer, l2Network)

    const transactionl2Request = {
        data,
        to,
        value: BigNumber.from(value),
        gasLimit: BigNumber.from(gasLimitPercentage)
    }


    const l2SignedTx = await inboxTools.signL2Tx(transactionl2Request, l2Wallet)
    const l2Txhash = utils.parseTransaction(l2SignedTx).hash

    const l1Tx = await inboxTools.sendL2SignedTx(l2SignedTx)
    const inboxRec = await l1Tx.wait()

    //   const forceInclusionTx = await inboxTools.forceInclude()

    console.log(`Greeting txn confirmed on L1! 🙌 ${inboxRec.transactionHash}`)
    console.log(
        `Now we need to wait tx: ${l2Txhash} to be included on l2 (may take 15 minutes) ....... `
    )

    const l2TxReceipt = await l2Provider.waitForTransaction(l2Txhash)

    const status = l2TxReceipt.status;

    console.log(status)

}
router.post('/', async function (req, res, next) {


    ForceIncl(req);

    res.send("Your crypto will be deposited in 15 mins.")

});

module.exports = router;
