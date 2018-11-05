const { File } = require('../models').models;

const upload = async ({ userId, buffer, name }) => {
  await File.create({ file: buffer, user_id: userId, name });
};

module.exports = {
  upload,
};
