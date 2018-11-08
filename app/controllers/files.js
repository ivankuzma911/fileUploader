const { File } = require('../models').models;
const { encrypt, decrypt } = require('../libs/utilities');

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
  const { userId } = ctx.request;
  const fileId = ctx.params.id;

  const file = await File.findAll({
    where: { user_id: userId, id: fileId },
    attributes: ['id', 'name'],
    limit: 1,
  });

  ctx.body = file;
};

const encodeFiles = async (ctx) => {
  const { userId } = ctx.request;
  const { secret } = ctx.request.body;

  let hasNext = true;
  let lastId = 0;

  do {
    const result = await File.paginate({ where: { user_id: { $eq: userId }, id: { $gte: lastId } }, limit: 2 });
    const { results: rows, cursors } = result;

    const queries = rows.map((row) => {
      const file = encrypt(row.file, secret);
      return File.update(
        { file },
        { where: { id: row.id } },
      );
    });

    await Promise.all(queries);

    lastId = rows[rows.length - 1].id;
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
