const jwt = require('jsonwebtoken')
const db = require('../../db/sequelize')
const rg = require('./response-generator')

const JWT_KEY = 'WHATISTHIS'

async function verifyJWT(req, res, next) {
  if (req.headers.authorization) {
    try {
      const decoded = jwt.verify(req.headers.authorization, JWT_KEY)
      try {
        const currentUser = await db.models.User.findOne({
          where: {
            id: decoded.user_id,
            email: decoded.user_email
          }
        })
        if (currentUser) {
          const { hashed_password, ...currentUserNoPass } = currentUser.dataValues
          req.user = currentUserNoPass
          next()
        } else {
          throw 'Logged in user not found'
        }
      } catch (error) {
        res.send(rg(false, null, ['Failed to retrieve logged in user']))
      }
    } catch (error) {
      res.send(rg(false, null, ['Failed to decoded authorization token']))
    }
  } else {
    res.send(rg(false, null, ['Authorization header is not available']))
  }
}

module.exports = verifyJWT