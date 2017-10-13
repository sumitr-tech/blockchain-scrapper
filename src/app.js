import scrapperConfig from '../scrapper-config'
import { parseConfig } from './parser'
import { connectToDb } from './mongoose'
import runDaemonServices from './services'

const app = () => {
  scrapperConfig.map(config => parseConfig(config, (error, data) => {
    if (error) {
      console.log('Error In Parsing Data...', error)
    } else {
      runDaemonServices(data)
    }
  }))
}

connectToDb((error) => {
  if (!error) {
    app()
  }
})
