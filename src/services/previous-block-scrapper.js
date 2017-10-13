import { getListOfTransactionForMnemonic } from '../controller/account-controller'
import { createMultipleTransactionsInDB } from '../controller/transaction-controller'

class PreviousBlockScrapper {
  constructor (adapter, mnemonicId, initialBlock, lastBlock) {
    this.adapter = adapter
    this.startBlock = initialBlock
    this.lastBlock = lastBlock
    this.currentBlock = this.startBlock
    this.mnemonicId = mnemonicId
    this.pause = false
  }

  start () {
    this.runLopper(this.startBlock)
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

  runLopper (blockNumber) {
    if (blockNumber === this.lastBlock) {
      console.log('Previous Block Scrapper has completed scrapping...')
      return
    }

    this.adapter.getBlockTxs(blockNumber, (error, transactions) => {
      if (error) {
        console.log('Got error in Get block: ', error)
      } else {
        if (transactions) {
          getListOfTransactionForMnemonic(transactions, this.adapter, this.mnemonicId, (error, walletTransactions) => {
            if (!error) {
              if (walletTransactions.length > 0) {
                createMultipleTransactionsInDB(walletTransactions, this.adapter)
              }
            }
          })
          this.runLopper(blockNumber + 1)
        }
      }
    })
  }
}

export default PreviousBlockScrapper
