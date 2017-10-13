import mongoose from 'mongoose'
import db from '../mongoose'

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
    required: true
  },
  txTime: {
    type: Date,
    default: Date.now
  },
  blockNumber: {
    type: Number
  },
  txHash: {
    type: String
  }
})

export default db.model('Transaction', TransactionSchema)
