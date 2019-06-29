const express = require('express');
const db = require('../db/sequelize')
const rg = require('./utils/response-generator')

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', async (req, res, next) => {
  db.models.User.create({
    phone: req.body.phone,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    gender: req.body.gender,
    email: req.body.email,
  })
    .then(user => {
      res.send(rg(true, user, null))
    })
    .catch(error => {
      if (error.errors) {
        res.send(rg(false, null, error.errors.map(e => e.message)))
      } else {
        res.send(rg(false, null, error))
      }
    })
})

router.post('/login', async (req, res, next) => {
  db.models.User.findOne({
    where: {
      email: req.body.email,
      phone: req.body.phone
    }
  })
    .then(user => {
      if (user) {
        res.send(rg(true, user, null))
      } else {
        res.send(rg(false, null, ['Email and Mobile Phone pair doesn\'t match']))
      }
    })
    .catch(error => {
      res.send(rg(false, null, ['Email and Mobile Phone pair doesn\'t match']))
    })
})

module.exports = router;
