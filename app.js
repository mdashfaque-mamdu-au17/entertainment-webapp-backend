require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

const app = express();

const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/auth');
const movieRouter = require('./routes/movies');
const bookmarkRouter = require('./routes/bookmark');
const chartsRouter = require('./routes/charts');

// error handlers
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handle');

app.use(cors());
app.use(helmet());
app.use(mongoSanitize());

app.use(express.json());
app.use(express.static('./public'));

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/bookmarks', bookmarkRouter);
app.use('/api/v1/charts', chartsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
