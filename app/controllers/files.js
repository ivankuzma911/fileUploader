const { fork } = require('child_process');
const { File } = require('../models').models;
const { decrypt } = require('../libs/utilities');
const logger = require('../libs/logger');

const list = async (ctx) => {
  const { userId } = ctx.request;
  const files = await File.findAll({
    attributes: ['id', 'name'],
    where: { user_id: userId },
  });

  ctx.body = files;
};

const upload = async (ctx) => {
  const { userId } = ctx.request;
  const { buffer, originalname } = ctx.request.req.file;

  await File.create({ file: buffer, user_id: userId, name: originalname });

  ctx.body = 'File uploaded';
};

const deleteById = async (ctx) => {
  const { userId } = ctx.request;
  const fileId = ctx.params.id;

  const res = await File.destroy({
    where: { user_id: userId, id: fileId },
    limit: 1,
  });

  if (!res) throw new Error('Wrong options provided');
  ctx.body = `Deleted file with id: ${fileId}`;
};

const getById = async (ctx) => {
  const { userId, body } = ctx.request;
  const fileId = ctx.params.id;

  if (!(body && body.secret)) throw new Error('Provide secret');

  const result = await File.findAll({
    where: { user_id: userId, id: fileId },
    attributes: ['id', 'name', 'file', 'status'],
    limit: 1,
  });

  const {
    id,
    name,
    file,
    status,
  } = result.pop();

  ctx.body = {
    id,
    name,
    file: status !== 'processing' ? Buffer.from(decrypt(file, body.secret)).toString('base64') : null,
    status,
  };
};

const runFork = (userId, secret) => {
  const args = [
    '--userId', userId,
    '--secret', secret,
  ];

  const forked = fork('./scripts/encode.js', args);

  forked.on('error', logger.error);
  forked.on('close', logger.info);
};

const encodeFiles = async (ctx) => {
  const { userId } = ctx.request;
  const { secret } = ctx.request.body;

  runFork(userId, secret);

  ctx.body = 'Encoded all files';
};

module.exports = {
  upload,
  list,
  deleteById,
  getById,
  encodeFiles,
};
