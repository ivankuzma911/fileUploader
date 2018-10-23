const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    logging: false,
  });


const File = require('./files')(Sequelize, sequelize);

sequelize.sync();

const db = {
  Sequelize,
  sequelize,
  models: {
    File,
  },
};

module.exports = db;
