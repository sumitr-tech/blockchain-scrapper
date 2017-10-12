import convict from 'convict'

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  private_key_encryption_secret: {
    doc: 'This secret will be used to encrypt and decrypt the stored private keys',
    format: String,
    default: 'v&W8uK1M01&@$$ecGM@1#DU#Ipx7MV&CmThD@oPirrox3^Rgny50Eq*1MsCuVHdBWTzn07JQH6Qr#pAomfBPSdfgW$wx@%c*iif!',
    env: 'PRIV_KEY_ENC_SECRET'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  db_url: {
    doc: 'Database host name/IP',
    format: '*',
    default: 'mongodb://localhost/blockchainScrapper',
    env: 'MONGO_URL'
  },
  db_seed_admin_password: {
    doc: 'This will be the password of the Admin User',
    format: String,
    default: '0s@7VlD#ss',
    env: 'ADMIN_PASSWORD'
  },
  gas_limit_for_transactions: {
    doc: 'Gas limit for transactions',
    format: 'nat',
    default: 3000000,
    env: 'GAS_LIMIT_FOR_TRANSACTIONS'
  }
})

config.validate({allowed: 'strict'})

export default config
