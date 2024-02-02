const jwt = require('jsonwebtoken')
const models = require('../models')
const { MSG } = require('../helpers/constants')
const utility = require('../helpers/utility')
const { status } = require('../helpers/constants')

const verifyMyToken = async (req, res, next) => {
  const token = req.headers.authorization
  try {
    if (!token) {
      return res.status(status.UNAUTHORIZED).send(MSG[req.language.notauthorized])
    }
    const userToken = token.split(' ')[1]
    const verify = jwt.verify(userToken, `${process.env.TOKEN_SECRET}`)
    if (!verify) {
      return res.status(status.UNAUTHORIZED).send(utility.errorRes(MSG[req.language.notauthorized]))
    }
    const user = await models.Users.findOne({
      attributes: ['userId', 'firstName', 'middleName', 'lastName', 'userEmail', 'userTypeId'],
      where: { userId: verify.id || verify.userId },
    })
    if (!user) {
      return res.status(status.UNAUTHORIZED).send(utility.errorRes(MSG[req.language.notauthorized]))
    }
    req.user = user
    return next()
  } catch (err) {
    console.log('Error Occured in Auth middleware', err)
    return res.status(status.UNAUTHORIZED).send(utility.errorRes('Session Expired', status.UNAUTHORIZED))
  }
}

module.exports = {
  verifyMyToken,
}
