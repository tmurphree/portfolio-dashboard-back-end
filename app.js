const cookieParser = require('cookie-parser');
const expressEnforcesSsl = require('express-enforces-ssl');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const path = require('path');

const indexRouter = require('./routes/index.router');
const pricesRouter = require('./routes/prices.router');
const usersRouter = require('./routes/users.router');

const app = express();

if (process.env.NODE_ENV === 'production') {
  // add x-forwarded-proto to req.protocol and otherwise tell Express
  // we're behind a proxy
  // https://expressjs.com/en/guide/behind-proxies.html
  app.enable('trust proxy');
  app.use(expressEnforcesSsl());
}

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, Origin, X-Requested-With');
  res.set('Content-Security-Policy', "base-uri 'self'");
  res.set('Content-Security-Policy', "default-src 'none'");
  res.set('Content-Security-Policy', "font-src 'self'");
  res.set('Content-Security-Policy', "form-action 'self'");
  res.set('Content-Security-Policy', "img-src 'self'");
  res.set('Content-Security-Policy', "object-src 'self'");
  res.set('Content-Security-Policy', "script-src 'self'");
  res.set('Content-Security-Policy', "style-src 'self'");
  res.set('Content-Security-Policy', "worker-src 'self'");

  next();
});

app.use('/prices', pricesRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);

module.exports = app;
