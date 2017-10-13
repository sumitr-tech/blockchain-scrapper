class Bitcoin {
  constructor (toAddress, clientNode, zValue) {
    this.toAddress = toAddress
    this.clientNode = clientNode
    this.zValue = zValue
  }

  getBlock (blockNumber, callback) {
    // Dummy data for now
    setTimeout(() => callback(null, [{c: 1}, {d: 2}]), 10000)
  }

  getBlockTxs (blockNumber, callback) {
    // Dummy data for now
    setTimeout(() => callback(null, [{c: 1}, {d: 2}]), 10000)
  }

  getCurrentBlockNumber (callback) {
    // Dummy data for now
    setTimeout(() => callback(null, 421321), 10000)
  }

  getBalance (walletAddress, callback) {
    // Dummy data for now
    setTimeout(() => callback(null, 10), 4000)
  }

  transferAmount (fromAccount, value, callback) {
    // Dummy data for now
    setTimeout(() => callback(null, 'some txs hash'), 4000)
  }

  checkStatusOfTransaction (txHash, callback) {
    // Dummy data for now
    setTimeout(() => callback(null, 'Pending'), 4000)
  }
}

export default Bitcoin
