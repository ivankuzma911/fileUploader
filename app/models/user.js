
module.exports = (Types, sequelize) => sequelize.define('files', {
	file: { type: Types.BLOB(), allowNull: false },
	name: { type: Types.STRING },
});
  