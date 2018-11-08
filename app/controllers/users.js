const bcrypt = require('bcryptjs');
const { User } = require('../models').models;
const jwt = require('../libs/jwt');

const register = async (ctx) => {
  const { username, password, password_confirmation: passwordConfirmation } = ctx.request.body;
  if (password !== passwordConfirmation) throw new Error('Passwords not equal');

  const user = await User.findOne({ where: { username } });
  if (user) throw new Error('User with such username already exists');

  const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(8));
  await User.create({ username, password: hashedPassword });

  ctx.body = 'User succesfully created';
};

const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  const user = await User.findOne({ where: { username } });

  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const token = jwt.sign(user.id);
      ctx.body = token;
      return ctx;
    }
  }
  throw new Error('Credentials are not valid');
};

module.exports = {
  register,
  login,
};
