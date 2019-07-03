
const rg = require('./response-generator')
const db = require('../../db/sequelize')

async function checkPhoneEmail(req, res, next) {
  try {
    const sameEmail = await db.models.User.findAll({
      where: {
        email: req.body.email
      }
    })
    const sameMobile = await db.models.User.findAll({
      where: {
        phone: req.body.phone
      }
    })
    if (sameEmail.length === 0 && sameMobile.length === 0) {
      next()
    } else {
      let errors = []
      if (sameEmail.length > 0) errors.push('Email has been taken. Please use another email.')
      if (sameMobile.length > 0) errors.push('Mobile number has been taken. Please use another number.')
      res.send(rg(false, null, errors))
    }
  } catch (error) {
    console.error(error)
    res.send(rg(false, null, ['Failed to check email and mobile number']))
  }
}

module.exports = checkPhoneEmail