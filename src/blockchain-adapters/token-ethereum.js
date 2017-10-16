import setProvider from '../services/web3'
import _ from 'lodash'
import BigNumber from 'bignumber.js'
import Tx from 'ethereumjs-tx'
import { createTransactionInDB } from '../controller/transaction-controller'
import Ethereum from './ethereum'

class TokenETH extends Ethereum {
  constructor (toAddress, clientNode, zValue, contractAddress, abi) {
    super(toAddress, clientNode, zValue)
    this.contractAddress = contractAddress
    this.abi = abi
    this.web3 = setProvider(clientNode)

    const tokenContract = this.web3.eth.contract(abi)
    this.contract = tokenContract.at(contractAddress)
  }

  getBalance (walletAddress, callback) {
    this.contract.balanceOf(walletAddress, (error, result) => {
      if (error) {
        console.log('Error in Getting Token balance', error)
      }
      callback(error, result)
    })
  }

  getData (to, amount) {
    return `0xa9059cbb000000000000000000000000${to.replace('0x', '')}${this.getTokenAmount(amount)}`
  }

  getTokenAmount (amount) {
    return `${'0'.repeat(64)}${this.web3.toHex(amount).replace('0x', '')}`.slice(-64)
  }

  transferAmount (fromAccount, privatekey, value, callback) {
    const privateKey = new Buffer(privatekey, 'hex')

    // console.log(this.contract.transfer.getData(this.toAddress, value))

    const data = this.getData(this.toAddress, value)

    const rawTx = {
      from: fromAccount,
      nonce: this.getNonce(fromAccount),
      gasPrice: this.web3.toHex(this.web3.eth.gasPrice),
      gasLimit: this.web3.toHex(this.web3.eth.estimateGas({ to: this.contractAddress, data })),
      to: this.contractAddress,
      data
    }

    const tx = new Tx(rawTx)
    tx.sign(privateKey)

    const serializedTx = tx.serialize()
    // Return Tx Hash on succes
    this.web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), callback)
  }

  sendFundsFromAccounts (accounts) {
    const self = this
    _.forEach(accounts, (account) => {
      self.getBalance(account.walletAddress, (error, balance) => {
        if (error) {
          console.log('Error in Getting Balance: ', error)
        } else {
          const balanceInEther = new BigNumber(balance)
          if (parseInt(balanceInEther.toString(10)) > 0) {
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
        }
      })
    })
  }

  getTransactionObject (transaction) {
    return {
      senderAddress: transaction.from,
      receiverAddress: transaction.to,
      type: 'TOKEN',
      status: transaction.blockNumber ? 'Completed' : 'Pending',
      amount: transaction.value,
      blockNumber: transaction.blockNumber,
      transactionHash: transaction.hash
    }
  }

}

export default TokenETH
