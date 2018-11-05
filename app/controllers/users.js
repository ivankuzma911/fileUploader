const bcrypt = require('bcryptjs');
const { User } = require('../models').models;
const jwt = require('../libs/jwt');

const create = async (form) => {
  const { username, password, password_confirmation: passwordConfirmation } = form;
  if (password !== passwordConfirmation) throw new Error('Passwords not equal');

  const user = await User.findOne({ where: { username } });
  if (user) throw new Error('User with such username already exists');

  const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(8));
  await User.create({ username, password: hashedPassword });
};

const login = async (form) => {
  const { username, password } = form;
  const user = await User.findOne({ where: { username } });

  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) return jwt.sign(user.id);
  }
  throw new Error('Credentials are not valid');
};

module.exports = {
  create,
  login,
};
