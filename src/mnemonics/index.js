import bip39 from 'bip39'
import { HDNode, networks } from 'bitcoinjs-lib'
import {
  EthereumBlockchain,
  TokenEthereumBlockchain
} from '../constants'
import ethUtil from 'ethereumjs-util'
import Mnemonic from '../models/mnemonic'
import Account from '../models/account'

export const getAccountsForMnemonics = (config, callback) => {
  createMnemonicDBAccount(config.mnemonicCustomName, (error, mnemonic) => {
    if (!error) {
      createAccounts(config, mnemonic._id, callback)
    }
  })
}

const createMnemonicDBAccount = (mnemonicCustomName, callback) => {
  const mnemonic = new Mnemonic({
    name: mnemonicCustomName
  })
  mnemonic.save((error) => callback(error, mnemonic))
}

const createAccounts = (config, mnemonicId, callback) => {
  const { mnemonic, passphrase, path, lastIndex, blockchain } = config
  const bip32RootKey = getBip32RootKeyFromSeed(mnemonic, passphrase)
  const bip32extendedKey = getBip32ExtendedKey(bip32RootKey, path)

  createAllAccounts(bip32extendedKey, path, lastIndex, blockchain, mnemonicId, callback)
}

const createAllAccounts = (bip32extendedKey, path, lastIndex, blockchain, mnemonicId, callback) => {
  let accounts = []

  let i = 0
  let count = 0

  for (i = 0; i <= lastIndex; i++) {
    getAccountForIndex(bip32extendedKey, path, i, blockchain, (error, account) => {
      if (!error) {
        createDBAccount(account, blockchain, mnemonicId)
      }
      if (count === lastIndex) {
        callback(null, accounts)
      }
      count += 1
    })
  }
}

const createDBAccount = (account, blockchain, mnemonicId) => {
  const dbAccount = new Account({
    walletAddress: account.address,
    type: blockchain === EthereumBlockchain || blockchain === TokenEthereumBlockchain ? 'ETH' : 'BTC',
    privateKeyEncrypted: account.privkey,
    publicKey: account.pubkey,
    mnemonicPath: account.index,
    mnemonicRef: mnemonicId
  })
  dbAccount.save((error) => {
    if (error) {
      console.error(`Error in creation of Account for MnemonicId: ${mnemonicId} index: ${account.index}`)
    }
  })
}

const getBip32RootKeyFromSeed = (phrase, passphrase) => {
  const seed = bip39.mnemonicToSeed(phrase, passphrase)
  const bip32RootKey = HDNode.fromSeedHex(seed, networks.bitcoin)
  return bip32RootKey
}

const getBip32ExtendedKey = (bip32RootKey, path) => {
  let extendedKey = bip32RootKey

  const pathBits = path.split('/')

  let i = 0
  for (i = 0; i < pathBits.length; i++) {
    const bit = pathBits[i]
    const index = parseInt(bit)

    if (isNaN(index)) {
      continue
    }

    const hardened = bit[bit.length - 1] === "'"
    const isPriv = !(extendedKey.isNeutered())
    const invalidDerivationPath = hardened && !isPriv

    if (invalidDerivationPath) {
      extendedKey = null
    } else if (hardened) {
      extendedKey = extendedKey.deriveHardened(index)
    } else {
      extendedKey = extendedKey.derive(index)
    }
  }
  return extendedKey
}

const getAccountForIndex = (bip32ExtendedKey, path, index, blockchain, callback) => {
  try {
    let key = 'NA'
    key = bip32ExtendedKey.derive(index)

    let address = key.getAddress().toString()
    let privkey = 'NA'

    if (!key.isNeutered()) {
      privkey = key.keyPair.toWIF(networks.bitcoin)
    }

    let pubkey = key.getPublicKeyBuffer().toString('hex')
    const indexText = `${path}/${index}`

    if (blockchain === EthereumBlockchain || blockchain === TokenEthereumBlockchain) {
      const privKeyBuffer = key.keyPair.d.toBuffer()
      privkey = privKeyBuffer.toString('hex')

      const addressBuffer = ethUtil.privateToAddress(privKeyBuffer)
      const hexAddress = addressBuffer.toString('hex')
      const checksumAddress = ethUtil.toChecksumAddress(hexAddress)

      address = ethUtil.addHexPrefix(checksumAddress)
      privkey = ethUtil.addHexPrefix(privkey)
      pubkey = ethUtil.addHexPrefix(pubkey)
    }

    callback(null, {
      index: indexText,
      address,
      privkey,
      pubkey
    })
  } catch (e) {
    callback(e, null)
  }
}
