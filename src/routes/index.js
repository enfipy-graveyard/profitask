const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('Очікуємо запити!')
})

router.use(require('./names'))
router.use(require('./strings'))

module.exports = router
