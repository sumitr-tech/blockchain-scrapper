class PreviousBlockScrapper {
  constructor (adapter, initialBlock, lastBlock, timeInterval) {
    this.adapter = adapter
    this.timeInterval = timeInterval
    this.startBlock = initialBlock
    this.lastBlock = lastBlock
    this.currentBlock = null
    this.pause = false
  }

  start () {
    this.runlopper()
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

export default PreviousBlockScrapper
