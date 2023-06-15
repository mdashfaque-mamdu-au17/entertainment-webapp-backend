const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title name is required'],
  },
  thumbnail: {
    trending: {
      small: {
        type: String,
      },
      large: {
        type: String,
      },
    },
    regular: {
      small: {
        type: String,
        required: [true, 'Small regular image is required'],
      },
      medium: {
        type: String,
        required: [true, 'Medium regular image is required'],
      },
      large: {
        type: String,
        required: [true, 'Large regular image is required'],
      },
    },
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
  },
  category: {
    type: String,
    enum: ['Movie', 'TV Series'],
    required: [true, 'Category type is required'],
  },
  rating: {
    type: String,
    enum: ['PG', 'E', '18+'],
    required: [true, 'Rating is required'],
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Movie', MovieSchema);
