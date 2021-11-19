const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const config = require('./config');

const PORT = process.env.PORT || 5001;

const app = express();

const mongoString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cqns5.mongodb.net/coding-blog`;
mongoose.connect(mongoString);

mongoose.connection.on('error', function (error) {
  if (process.env.NODE_ENV === 'development') {
    console.log(error);
  }
});

mongoose.connection.on('open', function () {
  console.log('Connected to MongoDB database.');
})

// middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'development' ? config.devAdminURL : /admin.josearc.me$/,
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());

app.use(require('./routes/admin-user'));
app.use(require('./routes/blog-posts'));
app.use(require('./routes/images'));
app.use(require('./routes/sitemap'));

app.listen(PORT, function () {
  console.log(`Express app listening on port ${PORT}`);
})