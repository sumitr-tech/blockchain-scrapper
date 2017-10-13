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

export const getAllAccounts = (mnemonicId, callback) => {
  Account.find({
    mnemonicRef: mnemonicId,
  }).exec((error, accounts) => {
    if (error) {
      console.log('Got Error in Querying Accounts: ', error)
      callback(error, [])
    }
    if (accounts.length > 0) {
      callback(error, accounts)
    } else {
      callback(error, [])
    }
  })
}

export const getListOfTransactionForMnemonic = (transactions, adapter, mnemonicId, callback) => {
  setImmediate(() => {
    const receiverAddresses = transactions.map(transaction => adapter.getReceiverAddressFromTransaction(transaction))

    const getTransactionForWalletAddresses = (addresses) => {
      const walletTransactions = transactions.filter(transaction => {
        return addresses.find(address => {
          return address.walletAddress === adapter.getReceiverAddressFromTransaction(transaction)
        })
      })
      callback(null, walletTransactions)
    }

    Account.find({
      mnemonicRef: mnemonicId,
      walletAddress: {$in: receiverAddresses}
    })
    .select({ walletAddress: 1 })
    .exec((error, accounts) => {
      if (error) {
        console.log('Got Error in Querying Accounts: ', error)
        callback(error, [])
      }

      if (accounts.length > 0) {
        getTransactionForWalletAddresses(accounts)
      } else {
        callback(error, [])
      }
    })
  })
}

export const getAccountsWhichReceivedFunds = (transactions, adapter, mnemonicId, callback) => {
  const receiverAddresses = transactions.map(transaction => adapter.getReceiverAddressFromTransaction(transaction))

  Account.find({
    mnemonicRef: mnemonicId,
    walletAddress: {$in: receiverAddresses}
  })
  .exec((error, accounts) => {
    if (error) {
      console.log('Got Error in Querying Accounts: ', error)
      callback(error, [])
    }
    if (accounts.length > 0) {
      callback(error, accounts)
    } else {
      callback(error, [])
    }
  })
}
