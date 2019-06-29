const Sequelize = require('sequelize')
const config = require('../config')

const sequelize = new Sequelize(
  config.POSTGRESQL_DB_NAME,
  config.POSTGRESQL_USERNAME,
  config.POSTGRESQL_PASSWORD,
  {
    port: config.POSTGRESQL_PORT,
    host: config.POSTGRESQL_ADDRESS,
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