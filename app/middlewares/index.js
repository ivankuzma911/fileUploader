
const jwt = require('../libs/jwt');

const errorHandler = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
};

const verifyToken = (ctx, next) => {
  const { token } = ctx.request.headers;

  if (token) {
    try {
      const userId = jwt.verify(token);
      ctx.request.userId = userId;
      return next();
    } catch (e) {}
  }

  throw new Error('Not allowed');
};

module.exports = {
  errorHandler,
  verifyToken,
};
