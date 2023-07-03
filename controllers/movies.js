const Movie = require('../models/Movie');
const Bookmark = require('../models/Bookmark');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllMovies = async (req, res) => {
  const { category, isTrending } = req.query;
  const queryObject = {};
  if (category) {
    queryObject.category = category;
  }

  if (isTrending) {
    queryObject.isTrending = isTrending;
  }

  const { userId } = req.user;
  const currentUsersBookmarks = await Bookmark.findOne({
    user: userId,
  });

  const results = await Movie.find(queryObject);

  const moviesWithBookmarkStatus = results.map((movie) => {
    const isBookmarked =
      currentUsersBookmarks &&
      currentUsersBookmarks.movies.includes(movie._id.toString());
    return { ...movie._doc, isBookmarked };
  });

  res.status(StatusCodes.OK).json({
    count: moviesWithBookmarkStatus.length,
    movies: moviesWithBookmarkStatus,
  });
};

const createMovies = async (req, res) => {
  const movie = await Movie.create(req.body);
  res.status(StatusCodes.CREATED).json({ movie });
};

const deleteMovie = async (req, res) => {
  const { id: movieId } = req.params;
  const movie = await Movie.findByIdAndRemove({ _id: movieId });
  if (!movie) {
    throw new NotFoundError(`No movie with id ${movieId}`);
  }
  res.status(StatusCodes.OK).send();
};

const updateMovie = async (req, res) => {
  const {
    body: { title, thumbnail, year, category, rating },
    params: { id: movieId },
  } = req;

  if (!title || !year || !category || !rating) {
    throw new BadRequestError(
      'Title, year, category and ratings are required'
    );
  }

  const movie = await Movie.findByIdAndUpdate(
    { _id: movieId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!movie) {
    throw new NotFoundError(`No movie with id ${movieId}`);
  }
  res.status(StatusCodes.OK).json({ movie });
};

module.exports = {
  getAllMovies,
  createMovies,
  deleteMovie,
  updateMovie,
};
