import setProvider from '../services/web3'
import Tx from 'ethereumjs-tx'
import _ from 'lodash'
import { createTransactionInDB } from '../controller/transaction-controller'
import BigNumber from 'bignumber.js'

class Ethereum {
  constructor (toAddress, clientNode, zValue) {
    this.toAddress = toAddress
    this.clientNode = clientNode
    this.zValue = zValue
    this.web3 = setProvider(clientNode)
  }

  getBlock (blockNumber, callback) {
    this.web3.eth.getBlock(blockNumber, callback)
  }

  getBlockTxs (blockNumber, callback) {
    this.web3.eth.getBlock(blockNumber, true, (error, block) => {
      callback(error, block ? block.transactions : null)
    })
  }

  getCurrentBlockNumber (callback) {
    this.web3.eth.getBlockNumber(callback)
  }

  getBalance (walletAddress, callback) {
    this.web3.eth.getBalance(walletAddress, callback)
  }

  transferAmount (fromAccount, privatekey, value, callback) {
    const privateKey = new Buffer(privatekey, 'hex')
    const estimateEthersForGas = this.getEstimateEthersForGas()
    value = this.web3.fromWei(value, 'ether')
    value = new BigNumber(value).minus(estimateEthersForGas)

    let rawTx = {
      from: fromAccount,
      nonce: this.getNonce(fromAccount),
      gasPrice: this.web3.toHex(this.web3.eth.gasPrice),
      gasLimit: this.web3.toHex(this.web3.eth.estimateGas({ to: this.toAddress })),
      to: this.toAddress,
      value: this.web3.toHex(this.web3.toWei(value, 'ether'))
    }

    let tx = new Tx(rawTx)
    tx.sign(privateKey)

    let serializedTx = tx.serialize()
    // Return Tx Hash on succes
    this.web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), callback)
  }

  getNonce (fromAddress) {
    let count = this.web3.eth.getTransactionCount(fromAddress)
    return (this.web3.toHex(count))
  };

  checkStatusOfTransaction (txHash, callback) {
    this.web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
      callback(error, receipt === null ? 'Pending' : 'Completed')
    })
  }

  sendFundsFromAccounts (accounts) {
    const self = this
    _.forEach(accounts, (account) => {
      self.getBalance(account.walletAddress, (error, balance) => {
        if (error || !(balance > 0)) {

        } else {
          self.transferAmount(account.walletAddress, account.privateKeyEncrypted.substr(2), balance, (error, txHash) => {
            if (error) {
              console.log('Error in Transfer Amount: ', error)
            } else {
              createTransactionInDB(self.getTransactionObject(self.getTransaction(txHash)), (error, tx) => {
                if (error) {
                  console.log('Error in Transaction saving: ', error)
                }
              })
            }
          })
        }
      })
    })
  }

  getTransaction (txHash) {
    return this.web3.eth.getTransaction(txHash)
  }

  getEstimateEthersForGas () {
    const gasPrice = this.web3.fromWei(this.web3.eth.gasPrice, 'ether')
    const estimateGas = this.web3.eth.estimateGas({ to: this.toAddress })
    return gasPrice.times(estimateGas)
  }

  getReceiverAddressFromTransaction (transaction) {
    return transaction.to
  }

  getSenderAddressFromTransaction (transaction) {
    return transaction.from
  }

  getValueFromTransaction (transaction) {
    return transaction.value
  }

  getTransactionHash (transaction) {
    return transaction.hash
  }

  getTransactionObject (transaction) {
    return {
      senderAddress: transaction.from,
      receiverAddress: transaction.to,
      type: 'ETH',
      status: transaction.blockNumber ? 'Pending' : 'Completed',
      amount: transaction.value,
      blockNumber: transaction.blockNumber,
      transactionHash: transaction.hash
    }
  }
}

export default Ethereum
