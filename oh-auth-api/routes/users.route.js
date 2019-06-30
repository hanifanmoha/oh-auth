const express = require('express');
const db = require('../db/sequelize')
const rg = require('./utils/response-generator')
const verifyJWT = require('./utils/verifyJWT')

const router = express.Router();

router.get('/', verifyJWT, async (req, res, next) => {
  const users = await db.models.User.findAll()
  const usersNoPass = users.map(user => {
    const { hashed_password, ...userNoPass } = user.dataValues
    return userNoPass
  })
  res.send(rg(true, {
    users: usersNoPass,
    user: req.user
  }, null))
});

module.exports = router;
