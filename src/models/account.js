import mongoose from 'mongoose'
import db from './../mongoose'
import { encrypt, decrypt } from '../services/crypto'

const Schema = mongoose.Schema

const AccountSchema = new Schema({
  walletAddress: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['BTC', 'ETH'],
    require: true
  },
  privateKeyEncrypted: {
    type: String,
    required: true,
    get: decrypt,
    set: encrypt
  },
  publicKey: {
    type: String,
    required: true
  },
  mnemonicPath: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  mnemonicRef: {
    type: Schema.Types.ObjectId,
    ref: 'Mnemonic'
  }
})

export default db.model('Account', AccountSchema)
