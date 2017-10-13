import Account from '../models/account'
import {
  EthereumBlockchain,
  TokenEthereumBlockchain
} from '../constants'

export const createDBAccount = (account, blockchain, mnemonicId) => {
  setImmediate(() => {
    const dbAccount = new Account({
      walletAddress: account.address,
      type: blockchain === EthereumBlockchain || blockchain === TokenEthereumBlockchain ? 'ETH' : 'BTC',
      privateKeyEncrypted: account.privkey,
      publicKey: account.pubkey,
      mnemonicPath: account.index,
      mnemonicRef: mnemonicId
    })
    dbAccount.save((error) => {
      if (error) {
        console.error(`Error in creation of Account for MnemonicId: ${mnemonicId} index: ${account.index}`)
      }
    })
  })
}

export const getAccountsWhichReceivedFunds = (transactions, mnemonicId, callback) => {
  setImmediate(() => {

    const receiverAddresses = transactions.map(transaction => transaction.to)

    Account.find({
      mnemonicRef: mnemonicId,
      walletAddress: {$in: receiverAddresses}
    })
    .exec((error, accounts) => {
      //make magic happen
      if (error) {
        console.log('Got Error in Querying Accounts: ', error)
      }
      callback(error, accounts)
    })
  })
}
