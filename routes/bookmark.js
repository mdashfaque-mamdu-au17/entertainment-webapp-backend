const express = require('express');
const router = express.Router();

const {
  createBookmark,
  getBookmarks,
  deleteBookmark,
} = require('../controllers/bookmark');
const authenticateUser = require('../middleware/authentication');

router
  .route('/')
  .get(authenticateUser, getBookmarks)
  .post(authenticateUser, createBookmark)
  .delete(authenticateUser, deleteBookmark);

module.exports = router;
