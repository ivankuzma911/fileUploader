const withPagination = require('sequelize-cursor-pagination');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    logging: false,
  });

const File = require('./file')(Sequelize, sequelize);
const User = require('./user')(Sequelize, sequelize);

withPagination()(File);

User.hasMany(File, { foreignKey: 'user_id', sourceKey: 'id' });

sequelize.sync();

const db = {
  Sequelize,
  sequelize,
  models: {
    File,
    User,
  },
  Op: Sequelize.Op,
};

module.exports = db;
