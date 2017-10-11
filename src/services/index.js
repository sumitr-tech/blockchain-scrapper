import CurrentBlockScrapper from './current-block-scrapper'
import PreviousBlockScrapper from './previous-block-scrapper'
import InitialTransfer from './initial-transfer'

const runCurrentBlockScrapper = (scrapper, callback) => {
  const currentBlockScrapper = new CurrentBlockScrapper(scrapper.adapter, 2000)
  currentBlockScrapper.start(callback)
}

const runPreviousBlockScrapper = (scrapper, lastBlock) => {
  const previousBlockScrapper = new PreviousBlockScrapper(scrapper.adapter, scrapper.initialBlock, lastBlock, 2000)
  previousBlockScrapper.start()
}

const runInitialTransfer = (scrapper) => {
  // Dummy data for now
  const listOfAccounts = []
  const initialTransfer = new InitialTransfer(scrapper.adapter, listOfAccounts)
  initialTransfer.startTranfer()
}

const runDaemonServices = (scrapper) => {
  runCurrentBlockScrapper(scrapper, (error, startBlockNumber) => {
    if (!error) {
      runPreviousBlockScrapper(scrapper, startBlockNumber)
      runInitialTransfer(scrapper)
    }
  })
}

export default runDaemonServices
