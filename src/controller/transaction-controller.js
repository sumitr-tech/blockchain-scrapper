import Transaction from '../models/transaction'

export const saveTransaction = (account, transaction, callback) => {
  const tx = new Transaction({
    senderAddress: account.walletAddress,
    receiverAddress: transaction.to,
    status: transaction.blockNumber === null ? 'Pending' : 'Completed',
    type: account.type,
    amount: transaction.value,
    blockNumber: transaction.blockNumber,
    txHash: transaction.hash
  })
  tx.save((error) => callback(error, tx))
}
