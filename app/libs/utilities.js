
const crypto = require('crypto');

const encrypt = (data, secret) => {
  const cipher = crypto.createCipher('aes-256-cbc', secret);
  const crypted = Buffer.concat([cipher.update(data), cipher.final()]);

  return crypted;
};

const decrypt = (data, secret) => {
  const decipher = crypto.createDecipher('aes-256-cbc', secret);
  try {
    const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
    return decrypted;
  } catch (e) {
    return null;
  }
};

module.exports = {
  encrypt,
  decrypt,
};
