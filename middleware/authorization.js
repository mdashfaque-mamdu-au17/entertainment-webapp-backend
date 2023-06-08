const { UnauthorizedError } = require('../errors');

const authorize = async (req, res, next) => {
  console.log(req.user);
  if (req.user.role === 'user') {
    console.log('I am in this check');
    throw new UnauthorizedError('Not authorized to use this route');
  }
  if (req.user.role === 'admin') {
    next();
  }
};

module.exports = authorize;
