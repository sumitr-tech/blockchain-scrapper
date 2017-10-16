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
  db_url: {
    doc: 'Database host name/IP',
    format: '*',
    default: 'mongodb://<username>:<password>.mlab.com:17965/blockchain_scrapper',
    env: 'MONGO_URL'
  },
  mnemonic_phrase_1: {
    doc: 'Mnemonic phrase',
    formate: String,
    default: '',
    env: 'MNEMONIC_PHRASE_1'
  }
})

config.validate({allowed: 'strict'})

export default config
