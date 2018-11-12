const { File } = require('../models').models;
const { encrypt, decrypt } = require('../libs/utilities');
const { pg } = require('../config');

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
    attributes: ['id', 'name', 'file'],
    limit: 1,
  });

  const { id, name, file } = result.pop();

  ctx.body = {
    id,
    name,
    file: Buffer.from(decrypt(file, body.secret)).toString('base64'),
  };
};

const encodeFiles = async (ctx) => {
  const { userId } = ctx.request;
  const { secret } = ctx.request.body;

  let hasNext = true;
  let lastId = 0;

  do {
    const files = await File.paginate({
      where: {
        user_id: { $eq: userId },
        id: { $gte: lastId },
        encoded: { $eq: false },
      },
      limit: pg.encodeFilesChunkSize,
    });

    const { results: rows, cursors } = files;

    const queries = rows.map((row) => {
      const file = encrypt(row.file, secret);
      return File.update(
        { file, encoded: true },
        { where: { id: row.id, encoded: false } },
      );
    });

    await Promise.all(queries);

    if (rows.length) {
      lastId = rows[rows.length - 1].id;
    }

    hasNext = cursors.hasNext;
  } while (hasNext);
  ctx.body = 'Encoded all files';
};

module.exports = {
  upload,
  list,
  deleteById,
  getById,
  encodeFiles,
};
