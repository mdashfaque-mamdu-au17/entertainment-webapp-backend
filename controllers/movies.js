const getAllMovies = async (req, res) => {
  res.end('Get all movies');
};

const createMovies = async (req, res) => {
  res.end('Create a movie');
};

const deleteMovie = async (req, res) => {
  res.end('Delete a movie');
};

const updateMovie = async (req, res) => {
  res.end('update a movie');
};

module.exports = {
  getAllMovies,
  createMovies,
  deleteMovie,
  updateMovie,
};
