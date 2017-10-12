import mongoose from 'mongoose'
import config from '../app-config'

const db = mongoose.createConnection(config.get('db_url'))

db.once('open', function callback () {
  console.log('db connection open')
})

export default db
