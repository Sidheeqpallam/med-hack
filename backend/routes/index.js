const router = require('express').Router()
const dsrModels = require('../models')
const versionRouter = require('./versionRouter')
const { status } = require('../helpers/constants')
const utility = require('../helpers/utility')

router.get('/', (req, res) => res.status(status.SUCCESS).send(utility.successRes('hackethon App Rest API', [])))

router.get('/syncDB', (req, res) => {
  if (dsrModels.sequelize.config.database === 'hackethon') {
    return res.status(400).send('Cannot sync this DB using this api.')
  }
  return dsrModels.sequelize
    .sync({
      force: true,
    })
    .then(() => res.status(200).send('Synced Database'))
    .catch((err) => res.status(500).send(err))
})

router.use('/api', versionRouter)

module.exports = router
