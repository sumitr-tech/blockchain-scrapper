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

  getBlock (blockHash, callback) {
    client.getBlock(blockHash, (err, data, resHeaders) => {
      callback(err, data, resHeaders);
    })
  }

  getBlockTxs (blockHash, callback) {
    client.getBlock(blockHash, (err, data, resHeaders) => {
      if (!err) {
          const numberOfTransactions = data.tx.length;
          saveTransactions(data.tx, numberOfTransactions, (err, transaction, resHeaders) => {
              data.transaction = transaction;
              callback(err, transaction, resHeaders);
          });
        } else {
            console.log("Error: ", err);
        }
    })
  }

  saveTransactions (data, count, callback) {
      if(count <= 0) return;
      try {
        getTransaction(data[count-1], (err, transaction, resHeaders) => {
            saveTransactions(data, count-1, callback)
            tx.push(transaction);
            if(tx.length == count) {
                callback(err, tx, resHeaders);
            }
        });
      } catch(err) {
        callback(err, []);
      }
  }

  getCurrentBlockNumber (callback) {
    client.getBlockCount((err, data, resHeaders) => {
      callback(err, data, resHeaders);
    })
  }

  getBalance (walletAddress, callback) {
    client.getBalance(walletAddress, (err, balance, resHeaders) => {
      callback(err, balance, resHeaders);
    })
  }

  getTransaction (txid, callback) {
    client.getTransaction(txid, (err, balance, resHeaders) => {
      callback(err, balance, resHeaders);
    })
  }

  transferAmount (fromAccount, value, callback) {
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
