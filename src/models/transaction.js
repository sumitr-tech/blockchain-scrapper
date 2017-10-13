import mongoose from 'mongoose'
import db from '../mongoose'
import BigNumber from 'bignumber.js'

const Schema = mongoose.Schema

const TransactionSchema = new Schema({
  senderAddress: {
    type: String,
    required: true
  },
  receiverAddress: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    required: true
  },
  type: {
    type: String,
    enum: ['BTC', 'ETH', 'TOKEN'],
    require: true
  },
  amount: {
    type: String,
    required: true,
    validate: {
      validator: (val) => {
        if (isNaN(val)) { return false }
        if (new BigNumber(val).isNegative()) { return false }
        return new BigNumber(val).modulo(1).isZero()
      }
    },
    get: amount => new BigNumber(amount)
  },
  transactionTime: {
    type: Date,
    default: Date.now
  },
  blockNumber: {
    type: Number
  },
  transactionHash: {
    type: String
  }
})

export default db.model('Transaction', TransactionSchema)
