import setProvider from '../services/web3'
import Tx from 'ethereumjs-tx'

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
      callback(error, block.transactions)
    })
  }

  getCurrentBlockNumber (callback) {
    this.web3.eth.getBlockNumber(callback)
  }

  getBalance (walletAddress, callback) {
    this.web3.eth.getBalance(address, callback)
  }

  transferAmount (fromAccount, value, callback) {
    // Need to move private key and gas limit
    let privateKey = new Buffer(privatekey, 'hex')
    let rawTx = {
      nonce: this.getNonce(fromAccount),
      gasPrice: this.web3.toHex(this.web3.eth.gasPrice),
      gasLimit: this.web3.toHex(3000000),
      to: this.toAddress,
      value: this.web3.toHex(this.web3.toWei(value, 'ether'))
    }

    let tx = new Tx(rawTx);
    tx.sign(privateKey);

    let serializedTx = tx.serialize();
    // Return Tx Hash on succes
    this.web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), callback);
  }

  getNonce(fromAddress) {
    let count = this.web3.eth.getTransactionCount(fromAddress);
    return(this.web3.toHex(count))
  };

  checkStatusOfTransaction (txHash, callback) {
    this.web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
      callback(error, receipt === null ? 'Pending' : 'Success')
    })
  }
}

export default Ethereum
