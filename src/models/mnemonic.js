import mongoose from 'mongoose'
import db from './../mongoose'

const Schema = mongoose.Schema

const MnemonicSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default db.model('Mnemonic', MnemonicSchema)
