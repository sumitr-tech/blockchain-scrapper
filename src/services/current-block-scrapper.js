class CurrentBlockScrapper {
  constructor (adapter, timeInterval) {
    this.adapter = adapter
    this.timeInterval = timeInterval
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
      this.startBlock = result
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
        this.adapter.getBlock(this.currentBlock, (error, result) => {
          if (error) {
            console.log('Got error in Get block: ', error)
          }

          this.currentBlock += 1
        })
      }
    }, this.timeInterval)
  }
}

export default CurrentBlockScrapper
