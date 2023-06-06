const register = async (req, res) => {
  res.end('Register user');
};

const login = async (req, res) => {
  res.end('Login user');
};

const updateUser = async (req, res) => {
  res.end('update user');
};

module.exports = { register, login, updateUser };
