import scrapperConfig from '../scrapper-config'
import { parseConfig } from './parser'
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

app()
