const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const postRouter = require('./routes/postRouter');

require('dotenv').config();

const app = express();

const mongoDB = process.env.DEV_MONGODB_URI;
mongoose.set('strictQuery', false);
const main = async () => {
  await mongoose.connect(mongoDB);
};
main().catch((err) => console.log(err.message));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/posts', postRouter);

module.exports = app;