import Transaction from '../models/transaction'
import _ from 'lodash'

export const createTransactionInDB = (tx, callback) => {
  setImmediate(() => {
    const transaction = new Transaction(tx)
    transaction.save()
  })
}

export const createMultipleTransactionsInDB = (transactions, adapter) => {
  setImmediate(() => {
    transactions.forEach(transaction => {
      const transactionObject = adapter.getTransactionObject(transaction)
      createTransactionInDB(transactionObject)
    })
  })
}

export const updateTransactionsStatus = (transactions, adapter, blockNumber) => {
  const transactionHashes = transactions.map(transaction => adapter.getTransactionHash(transaction))

  Transaction.find({
    transactionHash: {$in: transactionHashes}
  }).exec((error, txs) => {
    if (error) {
      console.log('Got Error in Querying Transactions: ', error)
    }

    if (txs.length > 0) {
      _.forEach(txs, (tx) => {
        if (!tx.blockNumber) {
          tx.blockNumber = _.result(_.find(transactions, (transaction) => {
            return tx.transactionHash === adapter.getTransactionHash(transaction)
          }), 'blockNumber')
          tx.save()
        } else {
          if (tx.blockNumber + adapter.zValue < blockNumber) {
            tx.status = 'Completed'
            tx.save()
          }
        }
      })
    }
  })
}
