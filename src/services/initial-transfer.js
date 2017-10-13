import { getAllAccounts } from '../controller/account-controller'

class InitialTransfer {
  constructor (adapter, mnemonicId) {
    this.adapter = adapter
    this.mnemonicId = mnemonicId
  }

  startTranfer () {
    getAllAccounts(this.mnemonicId, (error, accounts) => {
      if (!error) {
        if (accounts.length > 0) {
          this.adapter.sendFundsFromAccounts(accounts)
        }
      }
    })
  }
}

export default InitialTransfer
