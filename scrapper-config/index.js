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

// Sample Config for Tokens

// {
//   mnemonicCustomName: 'Mnemonic1',
//   mnemonic: 'mnemonic',
//   passphrase: '',
//   path: `m/44'/60'/0'/0`,
//   lastIndex: 10,
//   initialBlock: 1875800,
//   zValue: 10,
//   blockchain: TokenEthereumBlockchain,
//   toAddress: '0x6862932bf3082b7cA21ccb2d242080B0906A4E4d',
//   clientNode: 'http://localhost:8545',
//   abi: [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}],
//   contractAddress: '0xabc'
// }
