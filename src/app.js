const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(require('./routes'))

app.listen(3000, () => {
  console.log('Example app listening on port http://localhost:3000!')
})
