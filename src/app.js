import scrapperConfig from '../scrapper-config'
import { parseConfig } from './parser'
import runDaemonServices from './services'

const app = () => {
  const scrapperData = parseConfig(scrapperConfig)
  scrapperData.forEach(data => runDaemonServices(data))
}

app()
