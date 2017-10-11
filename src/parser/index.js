import {
  EthereumBlockchain,
  BitcoinBlockchain,
  TokenEthereumBlockchain
} from '../constants'

import Adapter from '../blockchain-adapters'

export const parseConfig = (config) => {
  return config.map(config => {
    const adapter = getBlockchainAdopter(config)
    return {
      blockchain: config.blockchain,
      adapter
    }
  })
}

const getBlockchainAdopter = (config) => {
  const { blockchain, zValue, toAddress, clientNode, contractAddress } = config

  switch (blockchain) {
    case EthereumBlockchain:
      return new Adapter.Bitcoin(toAddress, clientNode, zValue)
    case BitcoinBlockchain:
      return new Adapter.Ethereum(toAddress, clientNode, zValue)
    case TokenEthereumBlockchain:
      return new Adapter.TokenETH(toAddress, clientNode, zValue, contractAddress)
    default:
      return undefined
  }
}
