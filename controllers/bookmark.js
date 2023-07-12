const Movie = require('../models/Movie');
const Bookmark = require('../models/Bookmark');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getBookmarks = async (req, res) => {
  const { userId } = req.user;
  const { category } = req.query;

  const currentUserBookmarks = await Bookmark.findOne({
    user: userId,
  }).populate('movies');

  if (!currentUserBookmarks) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: 'Nothing here! please bookmark movies',
    });
    return;
  }

  let filteredBookmarks = currentUserBookmarks.movies;

  if (category) {
    filteredBookmarks = filteredBookmarks.filter(
      (movie) => movie.category === category
    );
  }

  filteredBookmarks = filteredBookmarks.map((movie) => {
    return { ...movie.toObject(), isBookmarked: true };
  });

  res.status(StatusCodes.OK).json({ movies: filteredBookmarks });
};

const createBookmark = async (req, res) => {
  const userId = req.user.userId;
  const { movieId } = req.body;

  if (!movieId) {
    throw new BadRequestError('Movie id is required');
  }

  const movie = await Movie.findById({ _id: movieId });
  if (!movie) {
    throw new NotFoundError('Movie not found');
  }

  let currentUserBookmarks = await Bookmark.findOne({
    user: userId,
  });

  if (!currentUserBookmarks) {
    await Bookmark.create({
      user: userId,
      movies: [movieId],
    });
  } else {
    currentUserBookmarks.movies.unshift(movieId);
    await currentUserBookmarks.save();
  }

  res.status(StatusCodes.CREATED).json({ message: 'Bookmark added' });
};

const deleteBookmark = async (req, res) => {
  const userId = req.user.userId;
  const { movieId } = req.body;

  if (!movieId) {
    throw new BadRequestError('Movie id is required');
  }

  const movie = await Movie.findById({ _id: movieId });
  if (!movie) {
    throw new NotFoundError('Movie not found');
  }

  let currentUserBookmarks = await Bookmark.findOne({
    user: userId,
  });

  if (!currentUserBookmarks) {
    throw new NotFoundError('Bookmark not found');
  }

  const movieIndex = currentUserBookmarks.movies.indexOf(movieId);
  if (movieIndex !== -1) {
    currentUserBookmarks.movies.splice(movieIndex, 1);
    await currentUserBookmarks.save();
  }

  res.status(StatusCodes.OK).json({ message: 'Bookmark removed' });
};

module.exports = { getBookmarks, createBookmark, deleteBookmark };
