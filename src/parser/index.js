import Adapter from '../blockchain-adapters'
import { getAccountsForMnemonics } from '../mnemonics'
import {
  EthereumBlockchain,
  BitcoinBlockchain,
  TokenEthereumBlockchain
} from '../constants'

export const parseConfig = (config, callback) => {
  const adapter = getBlockchainAdopter(config)
  console.log('Accounts Creation Started...')

  getAccountsForMnemonics(config, (error, mnemonicId) => {
    if (error) {
      console.log('Got Error In Accounts Creation: ', error)
    } else {
      console.log('Accounts Created...')
    }

    callback(error, {
      blockchain: config.blockchain,
      initialBlock: config.initialBlock,
      mnemonicId,
      adapter
    })
  })
}

const getBlockchainAdopter = (config) => {
  const { blockchain, zValue, toAddress, clientNode, contractAddress } = config

  switch (blockchain) {
    case BitcoinBlockchain:
      return new Adapter.Bitcoin(toAddress, clientNode, zValue)
    case EthereumBlockchain:
      return new Adapter.Ethereum(toAddress, clientNode, zValue)
    case TokenEthereumBlockchain:
      return new Adapter.TokenETH(toAddress, clientNode, zValue, contractAddress)
    default:
      return undefined
  }
}
