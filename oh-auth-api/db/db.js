const config = require('../config')

const pgp = require('pg-promise')({
})

module.exports = pgp(config.POSTGRESQL_URL)