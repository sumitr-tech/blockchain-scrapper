import CurrentBlockScrapper from './current-block-scrapper'
import PreviousBlockScrapper from './previous-block-scrapper'
import InitialTransfer from './initial-transfer'

const runCurrentBlockScrapper = (scrapper, callback) => {
  console.log("Starting Current Block Scrapper...")

  const currentBlockScrapper = new CurrentBlockScrapper(scrapper.adapter, 2000)
  currentBlockScrapper.start(callback)
}

const runPreviousBlockScrapper = (scrapper, lastBlock) => {
  console.log("Starting Previous Block Scrapper...")

  const previousBlockScrapper = new PreviousBlockScrapper(scrapper.adapter, scrapper.initialBlock, lastBlock, 2000)
  previousBlockScrapper.start()
}

const runInitialTransfer = (scrapper) => {
  // Dummy data for now
  console.log("Starting Initial Transfer Module...")

  const listOfAccounts = []
  const initialTransfer = new InitialTransfer(scrapper.adapter, listOfAccounts)
  initialTransfer.startTranfer()
}

const runDaemonServices = (scrapper) => {
  console.log("Starting All Daemon Services...")
  runCurrentBlockScrapper(scrapper, (error, startBlockNumber) => {
    if (!error) {
      runPreviousBlockScrapper(scrapper, startBlockNumber)
      runInitialTransfer(scrapper)
    }
  })
}

export default runDaemonServices
