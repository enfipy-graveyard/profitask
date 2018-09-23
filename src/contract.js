const fs = require("fs")
const Web3 = require('web3')

const privateKey = process.env.PRIVATE_KEY

let contract

const getContract = () => {
  if (contract) { return contract }

  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
  }
  else {
    web3 = new Web3(new Web3.providers.HttpProvider(
      'https://ropsten.infura.io/r6ZC6HGIn96WneajiV18'
    ))
  }

  const contractAbi = JSON.parse(fs.readFileSync('src/contract_abi.json'))

  contract = new web3.eth.Contract(
    contractAbi, '0xdbc9b28d7a92bd11ddf628e54813a4db815dd19d', {
      from: '0x279f62a57E310731907Bc3dA02DF3B9806Da6098',
      gasPrice: '20000000000'
    }
  )

  return contract
}

module.exports = getContract()
