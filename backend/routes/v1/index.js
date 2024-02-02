const router = require('express').Router()
const customerAuthMiddleware = require('../../middlewares/customerAuth')

const authRouter = require('./auth')
const customerRouter = require('./customer')

router.use('/auth', authRouter)
  .use('/customer', customerAuthMiddleware.verifyUser, customerRouter)

module.exports = router
