const { UnauthorizedError } = require('../errors');

const authorize = async (req, res, next) => {
  if (req.user.role === 'user') {
    throw new UnauthorizedError('Not authorized to use this route');
  }
  if (req.user.role === 'admin') {
    next();
  }
};

module.exports = authorize;
