import Transaction from '../models/transaction'

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
      // console.log("damskldmas :", transactionObject)
      createTransactionInDB(transactionObject)
    })
  })
}
