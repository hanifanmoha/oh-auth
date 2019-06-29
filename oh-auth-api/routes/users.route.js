const express = require('express');
const db = require('../db/sequelize')
const rg = require('./utils/response-generator')

const router = express.Router();

router.get('/', async (req, res, next) => {
  db.models.User.findAll()
    .then(users => {
      res.send(rg(true, users, null))
    })
    .catch(error => {
      res.send(rg(false, null, error))
    })
});

module.exports = router;
