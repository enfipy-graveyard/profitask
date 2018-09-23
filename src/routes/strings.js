const router = require('express').Router()
const Tx = require('ethereumjs-tx')
const Web3 = require('web3')

const config = require('../config')
const contract = require('../contract')

router.get('/getString', async (req, res) => {
  res.send(await contract.methods.getSomeString().call())
})

router.post('/setString', async (req, res) => {
  const str = req.body.string
  
  if (!str) {
    return res.json({ error: 'String should not be empty' })
  }
  
  var count = await web3.eth.getTransactionCount(config.publicKey)

  var rawTx = {
    value: '0x0',
    nonce: "0x" + count.toString(16),
    from: config.publicKey,
    to: contract._address,
    data: contract.methods.setSomeString(str).encodeABI(),
    gasPrice: web3.utils.toHex(3 * 1e9),
    gasLimit: web3.utils.toHex(3000000),
    chainId: 3,
  }

  try {
    var tx = new Tx(rawTx)
    tx.sign(Buffer.from(config.privateKey, 'hex'))

    var serializedTx = tx.serialize()

    const result = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))

    res.send(result)
  } catch (e) {
    res.json({ error: `Exception: ${e.message}` })
  }
})

module.exports = router
