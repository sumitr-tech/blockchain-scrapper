import bip39 from 'bip39'
import { HDNode, networks } from 'bitcoinjs-lib'
import {
  EthereumBlockchain,
  TokenEthereumBlockchain
} from '../constants'
import ethUtil from 'ethereumjs-util'

export const getAccountsForMnemonics = (config, callback) => {
  const { mnemonic, passphrase, path, lastIndex, blockchain } = config

  const bip32RootKey = getBip32RootKeyFromSeed(mnemonic, passphrase, path, lastIndex, blockchain)
  const bip32extendedKey = getBip32ExtendedKey(bip32RootKey, path)

  getAllAccounts(bip32extendedKey, path, lastIndex, blockchain, callback)
}

const getAllAccounts = (bip32extendedKey, path, lastIndex, blockchain, callback) => {
  let accounts = []

  let i = 0
  let count = 0

  for (i = 0; i < lastIndex; i++) {
    getAccountForIndex(bip32extendedKey, path, i, blockchain, (error, account) => {
      count += 1
      if (!error) {
        accounts.push(account)
      }
      if (count === lastIndex) {
        callback(null, accounts)
      }
    })
  }
}

const getBip32RootKeyFromSeed = (phrase, passphrase, path, lastIndex, blockchain) => {
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
