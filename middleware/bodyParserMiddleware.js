const bodyParser = require('body-parser')

const BodyParser = (app) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
}

module.exports = BodyParser