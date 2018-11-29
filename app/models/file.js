
module.exports = (Types, sequelize) => sequelize.define('files', {
  file: { type: Types.BLOB(), allowNull: false },
  name: { type: Types.STRING },
  user_id: { type: Types.INTEGER },
  encoded: { type: Types.BOOLEAN, defaultValue: false },
  status: { type: Types.STRING, defaultValue: 'uploaded' },
});
