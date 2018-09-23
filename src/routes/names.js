const router = require('express').Router()
const contract = require('../contract')

router.get('/getNames', async (req, res) => {
  const names = []
  const senders = await contract.methods.getSenders().call()

  senders.forEach((sender, id) => {
    names.push(contract.methods.getName(sender).call())
  })

  res.send(await Promise.all(names))
})

module.exports = router
