class TokenETH {
  constructor (toAddress, clientNode, zValue, contractAddress) {
    this.toAddress = toAddress
    this.clientNode = clientNode
    this.contractAddress = contractAddress
    this.zValue = zValue
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

export default TokenETH
