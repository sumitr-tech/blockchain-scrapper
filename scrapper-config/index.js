import { EthereumBlockchain } from '../src/constants'
import config from '../app-config'

const scrapperConfig = [
  {
    mnemonicCustomName: 'Mnemonic1',
    mnemonic: config.get('mnemonic_phrase_1'),
    passphrase: '',
    path: `m/44'/60'/0'/0`,
    lastIndex: 10,
    initialBlock: 1875800,
    zValue: 10,
    blockchain: EthereumBlockchain,
    toAddress: '0x6862932bf3082b7cA21ccb2d242080B0906A4E4d',
    clientNode: 'http://localhost:8545'
  }
]

export default scrapperConfig
