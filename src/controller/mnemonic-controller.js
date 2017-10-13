import Mnemonic from '../models/mnemonic'

export const createMnemonicDBAccount = (mnemonicCustomName, callback) => {
  const mnemonic = new Mnemonic({
    name: mnemonicCustomName
  })
  mnemonic.save((error) => callback(error, mnemonic))
}
