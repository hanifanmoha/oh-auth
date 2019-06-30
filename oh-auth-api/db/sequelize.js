const Sequelize = require('sequelize')
const dbconfig = require('../config/db')

const sequelize = new Sequelize(
  dbconfig.POSTGRESQL_DB_NAME,
  dbconfig.POSTGRESQL_USERNAME,
  dbconfig.POSTGRESQL_PASSWORD,
  {
    port: dbconfig.POSTGRESQL_PORT,
    host: dbconfig.POSTGRESQL_ADDRESS,
    logging: console.log,
    dialect: 'postgres',
    define: {
      timestamps: false
    }
  }
);

const models = {
  User: sequelize.import('./models/user.model'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = {
  sequelize,
  models
}