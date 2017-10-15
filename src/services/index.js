import CurrentBlockScrapper from './current-block-scrapper'
import PreviousBlockScrapper from './previous-block-scrapper'
import InitialTransfer from './initial-transfer'

const runCurrentBlockScrapper = (scrapper, callback) => {
  console.log('Starting Current Block Scrapper...')

  const currentBlockScrapper = new CurrentBlockScrapper(scrapper.adapter, scrapper.mnemonicId, 5000)
  currentBlockScrapper.start(callback)
}

const runPreviousBlockScrapper = (scrapper, lastBlock) => {
  console.log('Starting Previous Block Scrapper...')

  const previousBlockScrapper = new PreviousBlockScrapper(scrapper.adapter, scrapper.mnemonicId, scrapper.initialBlock, lastBlock)
  previousBlockScrapper.start()
}

const runInitialTransfer = (scrapper) => {
  console.log('Starting Initial Transfer Module...')

  const initialTransfer = new InitialTransfer(scrapper.adapter, scrapper.mnemonicId)
  initialTransfer.startTranfer()
}

const runDaemonServices = (scrapper) => {
  console.log('Starting All Daemon Services...')
  runCurrentBlockScrapper(scrapper, (error, startBlockNumber) => {
    if (!error) {
      runPreviousBlockScrapper(scrapper, startBlockNumber)
      runInitialTransfer(scrapper)
    }
  })
}

export default runDaemonServices
