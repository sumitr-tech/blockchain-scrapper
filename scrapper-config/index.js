import {
  EthereumBlockchain,
  BitcoinBlockchain,
  TokenEthereumBlockchain
} from '../src/constants'

const scrapperConfig = [
  {
    mnemonic: 'test test test test',
    path: 'm/0/0/0',
    lastIndex: 10000,
    initialBlock: 1847000,
    zValue: 10,
    blockchain: EthereumBlockchain,
    toAddress: '0xA',
    clientNode: 'http://clientnode'
  },
  {
    mnemonic: 'test test test test',
    path: 'm/0/0/0',
    lastIndex: 10000,
    initialBlock: 1847000,
    zValue: 10,
    blockchain: BitcoinBlockchain,
    toAddress: '0xA',
    clientNode: 'http://clientnode'
  },
  {
    mnemonic: 'test test test test',
    path: 'm/0/0/0',
    lastIndex: 10000,
    initialBlock: 1847000,
    zValue: 10,
    blockchain: TokenEthereumBlockchain,
    toAddress: '0xA',
    contractAddress: '0xcontract',
    clientNode: 'http://clientnode'
  }
]

export default scrapperConfig
