import Web3 from 'web3'

export default function setProvider(node_url) {
  return (new Web3(new Web3.providers.HttpProvider(node_url)))
}
