const cookieParser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const path = require('path');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, Origin, X-Requested-With');
  res.set('Content-Security-Policy',"base-uri 'self'");
  res.set('Content-Security-Policy',"default-src 'none'");
  res.set('Content-Security-Policy',"font-src 'self'");
  res.set('Content-Security-Policy',"form-action 'self'");
  res.set('Content-Security-Policy',"img-src 'self'");
  res.set('Content-Security-Policy',"object-src 'self'");
  res.set('Content-Security-Policy',"script-src 'self'");
  res.set('Content-Security-Policy',"style-src 'self'");
  res.set('Content-Security-Policy',"worker-src 'self'");

  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
