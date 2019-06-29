const express = require('express');
const db = require('../db/db')
const rg = require('./utils/response-generator')

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  const query = 'SELECT * FROM users';
  db.query(query).then((data) => {
    res.send(rg(true, data, null))
  }).catch(error => {
    res.send(rg(false, null, error))
  })
});

router.post('/', function (req, res, next) {
  res.send('respond with a resource');
})

module.exports = router;
