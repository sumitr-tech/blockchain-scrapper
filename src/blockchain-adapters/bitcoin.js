import bitcoin from 'bitcoin';

const client = new bitcoin.Client({
  host: 'localhost',
  port: 18332,
});
const tx = [];

class Bitcoin {
  constructor (toAddress, clientNode, zValue) {
    this.toAddress = toAddress
    this.clientNode = clientNode
    this.zValue = zValue
  }

  getBlockHash (blockNumber, callback) {
    // Dummy data for now
    // setTimeout(() => callback(null, [{c: 1}, {d: 2}]), 10000)
    client.getBlockHash(blockNumber, (err, data, resHeaders) => {
      callback(err, data, resHeaders);
    })
  }

  getBlock (blockHash, callback) {
    // Dummy data for now
    // setTimeout(() => callback(null, [{c: 1}, {d: 2}]), 10000)
    client.getBlock(blockHash, (err, data, resHeaders) => {
      callback(err, data, resHeaders);
    })
  }

  getBlockWithTransaction (blockHash, callback) {
    // Dummy data for now
    // setTimeout(() => callback(null, [{c: 1}, {d: 2}]), 10000)
    client.getBlock(blockHash, (err, data, resHeaders) => {
      if (!err) {
          const numberOfTransactions = data.tx.length;
          printTransactions(data.tx, numberOfTransactions, (err, transaction, resHeaders) => {
              data.transaction = transaction;
              callback(err, transaction, resHeaders);
          });
        } else {
            console.log("Error: ", err);
        }
    })
  }
  
  getCurrentBlockNumber (callback) {
    // Dummy data for now
    // setTimeout(() => callback(null, 421321), 10000)
    client.getBlockCount((err, data, resHeaders) => {
      callback(err, data, resHeaders);
    })
  }

  getBalance (walletAddress, callback) {
    // Dummy data for now
    // setTimeout(() => callback(null, 10), 4000)
    client.getBalance(walletAddress, (err, balance, resHeaders) => {
      callback(err, balance, resHeaders);
    })
  }

  getTransaction (txid, callback) {
    // Dummy data for now
    // setTimeout(() => callback(null, 10), 4000)
    client.getTransaction(txid, (err, balance, resHeaders) => {
      callback(err, balance, resHeaders);
    })
  }

  printTransactions (data, count, callback) {
      if(count <= 0) return;
      try {
        getTransaction(data[count-1], (err, transaction, resHeaders) => {
            printTransactions(data, count-1, callback)
            tx.push(transaction);
            if(tx.length == count) {
                callback(err, tx, resHeaders);
            }
        });
      } catch(err) {
        callback(err, []);
      }
  }

  transferAmount (fromAccount, value, callback) {
    // Dummy data for now
    // setTimeout(() => callback(null, 'some txs hash'), 4000)
    client.sendFrom(fromAccount, this.toAddress, value, (err, data, resHeaders) => {
      callback(err, data, resHeaders);
    })
  }

  checkStatusOfTransaction (txHash, callback) {
    // Dummy data for now
    setTimeout(() => callback(null, 'Pending'), 4000)
  }
}

export default Bitcoin
