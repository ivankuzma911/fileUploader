const argv = require('minimist')(process.argv.slice(2));

const { encrypt } = require('../libs/utilities');
const { pg } = require('../config');
const { models } = require('../models');

const { File } = models;

const encodeFiles = async (userId, secret) => {
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
      const file = encrypt(row.file, secret.toString());
      return File.update(
        { file, encoded: true, status: 'processed' },
        { where: { id: row.id, encoded: false, status: 'processing' } },
      );
    });

    await Promise.all(queries);

    if (rows.length) {
      lastId = rows[rows.length - 1].id;
    }

    hasNext = cursors.hasNext;
  } while (hasNext);
};

const prepareFiles = (userId) => {
  return File.update(
    { status: 'processing' },
    {
      where: {
        user_id: userId,
        encoded: false,
        status: 'uploaded',
      },
    },
  );
};

(async () => {
  const { userId, secret } = argv;

  await prepareFiles(userId);
  await encodeFiles(userId, secret);

  process.exit();
})();
