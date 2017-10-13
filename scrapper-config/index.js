import { EthereumBlockchain } from '../src/constants'

const scrapperConfig = [
  {
    mnemonicCustomName: 'Mnemonic1',
    mnemonic: 'recall that despair search riot curve sail empower north furnace scheme frame sweet dizzy hockey',
    passphrase: 'test',
    path: `m/44'/60'/0'/0`,
    lastIndex: 10,
    initialBlock: 1847000,
    zValue: 10,
    blockchain: EthereumBlockchain,
    toAddress: '0xA',
    clientNode: 'http://clientnode'
  }
]

export default scrapperConfig
