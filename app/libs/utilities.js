
const crypto = require('crypto');

const encrypt = (data, secret) => {
  const cipher = crypto.createCipher('aes-256-cbc', secret);
  const crypted = cipher.update(data, 'utf-8', 'hex');

  return `${crypted}${cipher.final('hex')}`;
};

const decrypt = (data, secret) => {
  const decipher = crypto.createDecipher('aes-256-cbc', secret);
  try {
    const decrypted = decipher.update(data, 'hex', 'utf-8');
    return `${decrypted}${decipher.final('utf-8')}`;
  } catch (e) {
    return null;
  }
};

module.exports = {
  encrypt,
  decrypt,
};
