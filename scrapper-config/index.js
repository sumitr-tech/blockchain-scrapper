import {
  EthereumBlockchain,
  BitcoinBlockchain
} from '../src/constants'

const config = [
  {
    mnemonic: 'test test test test',
    path: 'm/0/0/0',
    lastIndex: 10000,
    initialBlock: 1847000,
    zValue: 10,
    blockchain: EthereumBlockchain
  },
  {
    mnemonic: 'test test test test',
    path: 'm/0/0/0',
    lastIndex: 10000,
    initialBlock: 1847000,
    zValue: 10,
    blockchain: BitcoinBlockchain
  }
]

export default config
