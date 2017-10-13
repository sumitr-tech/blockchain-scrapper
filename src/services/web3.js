import Web3 from 'web3'

export default function setProvider (url) {
  return (new Web3(new Web3.providers.HttpProvider(url)))
}
