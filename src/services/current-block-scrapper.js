import { getAccountsWhichReceivedFunds } from '../controller/account-controller'
import { updateTransactionsStatus } from '../controller/transaction-controller'

class CurrentBlockScrapper {
  constructor (adapter, mnemonicId, timeInterval) {
    this.adapter = adapter
    this.timeInterval = timeInterval
    this.mnemonicId = mnemonicId
    this.startBlock = null
    this.currentBlock = null
    this.pause = false
  }

  start (callback) {
    this.getStartBlock((error, startBlockNumber) => {
      if (!error) {
        this.runlopper()
      }
      callback(error, startBlockNumber)
    })
  }

  getStartBlock (callback) {
    this.adapter.getCurrentBlockNumber((error, result) => {
      if (error) {
        console.log('Error in getting Current Block Number: ', error)
      }

      console.log('Current Block Scrapper will start from Block: ', result)

      this.startBlock = result
      this.currentBlock = this.startBlock

      callback(error, result)
    })
  }

  stop () {
    clearInterval(this.timer)
  }

  resume () {
    this.pause = false
  }

  pause () {
    this.pause = true
  }

  runlopper () {
    this.timer = setInterval(() => {
      if (!this.pause) {
        this.adapter.getBlockTxs(this.currentBlock, (error, transactions) => {
          if (error) {
            console.log('Got error in Get block: ', error)
          } else {
            if (transactions) {
              console.log('Got Block Transactions: ', transactions.length)
              this.transferFunds(transactions)
              this.updateTransactions(transactions, this.currentBlock)
              this.currentBlock += 1
            }
          }
        })
      }
    }, this.timeInterval)
  }

  transferFunds (transactions) {
    getAccountsWhichReceivedFunds(transactions, this.adapter, this.mnemonicId, (error, accounts) => {
      if (!error) {
        if (accounts.length > 0) {
          this.adapter.sendFundsFromAccounts(accounts)
        }
      }
    })
  }

  updateTransactions (transactions, blockNumber) {
    updateTransactionsStatus(transactions, this.adapter, blockNumber)
  }
}

export default CurrentBlockScrapper
