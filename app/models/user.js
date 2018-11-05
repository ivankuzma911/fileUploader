module.exports = (Types, sequelize) => sequelize.define('users', {
  username: { type: Types.STRING, unique: true },
  password: { type: Types.STRING, allowNull: false },
});
