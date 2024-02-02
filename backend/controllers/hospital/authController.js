const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const utility = require('../../helpers/utility')
const { status, MSG } = require('../../helpers/constants')
const models = require('../../models')


const login = async (req, res) => {
  const { mobile, password } = req.body
  const [adminMobileNo, adminPassword] = [mobile, password]
  if (!adminMobileNo || !adminPassword) {
    return res.status(status.ERROR).send(utility.errorRes(MSG.missingRequiredData))
  }
  try {
    const admin = await models.Admins.findOne({
      where: { adminMobileNo },
      attributes: ['adminId', 'adminPassword', 'adminEmail', 'adminName', 'adminMobileNo'],
    })
    if (!admin
      || !(await bcrypt.compare(adminPassword, admin.adminPassword))) {
      return res.status(status.ERROR).send(utility.errorRes(MSG.invalidCredentials))
    }
    const { adminId } = admin.dataValues
    const token = jwt.sign({ adminId }, process.env.TOKEN_SECRET_ADMIN, {
      expiresIn: '15d',
    })
    return res.status(status.SUCCESS).send(
      utility.successRes(MSG.successfulLogin, {
        token,
        admin: {
          name: admin.adminName,
          email: admin.adminEmail,
          mobile: admin.adminMobileNo
        },
      }),
    )
  } catch (error) {
    return res.status(status.ERROR).send(utility.errorRes('Login Error'))
  }
}

module.exports = {
  login,
}
