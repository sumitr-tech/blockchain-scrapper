import mongoose from 'mongoose'
import config from '../app-config'

mongoose.Promise = global.Promise
const db = mongoose.createConnection(config.get('db_url'))

export const connectToDb = (callback) => {
  db.once('open', (error) => {
    if (error) {
      console.log('Error in DB Connection', error)
    } else {
      console.log('Connected to DB')
    }
    callback(error)
  })
}

export default db
