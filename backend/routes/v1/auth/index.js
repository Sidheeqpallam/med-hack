const router = require('express').Router()
const adminAuth = require('./admin')
const doctorAuth = require('./doctor')
const customerAuth = require('./customer')

router.use('/admin', adminAuth)
router.use('/doctor', doctorAuth)
router.use('/customer', customerAuth)

module.exports = router
