import { providers, Wallet, utils } from 'ethers';
import { ContractTransaction, Signer } from 'ethers'
import { network } from 'hardhat'
import * as dotenv from "dotenv";
import { Bridge__factory } from '@arbitrum/sdk/dist/lib/abi/factories/Bridge__factory';
import { L2Network, getL1Network, getL2Network } from '@arbitrum/sdk/dist/lib/dataEntities/networks'
import { BigNumber } from '@ethersproject/bignumber'
import { Inbox__factory } from '@arbitrum/sdk/dist/lib/abi/factories/Inbox__factory'
import { addDefaultLocalNetwork } from '@arbitrum/sdk/dist/lib/dataEntities/networks'

import { InboxTools } from '@arbitrum/sdk';
import {SequencerInbox__factory} from "@arbitrum/sdk/dist/lib/abi/factories/SequencerInbox__factory"

dotenv.config()

/**
 * Set up: instantiate L1 / L2 wallets connected to providers
 */
const walletPrivateKey: string = process.env.DEVNET_PRIVKEY!

const l1Provider = new providers.JsonRpcProvider(process.env.L1RPC)
const l2Provider = new providers.JsonRpcProvider(process.env.L2RPC)


const l1Wallet = new Wallet(walletPrivateKey, l1Provider)
const l2Wallet = new Wallet(walletPrivateKey, l2Provider)

const submitL2Tx = async (
  tx: {
    to: string
    value?: BigNumber
    data?: string
    nonce: number
    gasPriceBid: BigNumber
    gasLimit: BigNumber
  },
  l2Network: L2Network,
  l1Signer: Signer
): Promise<ContractTransaction> => {
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
  }
}



const main = async () => {


  const { l1Signer, l2Network, sequencerInbox, bridge } = await setup() 

  const inboxTools = new InboxTools(l1Signer, l2Network)
  console.log("===")

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
  console.log("===")

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })