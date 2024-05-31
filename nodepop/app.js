var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const basicAuth = require('./lib/basicAuth');
const sessionAuth = require('./lib/sessionAuth');
const LoginController = require('./controllers/LoginController');


const loginController = new LoginController();

// Execute module to connect db
require('./lib/connectMongoose')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// API routes
// Includes basicAuth to allow only authorized user to use API
app.use('/api/adverts', basicAuth, require('./routes/api/adverts'));

// Website routes
app.use(session({
  name: 'nodepop-session',
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true, 
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2 // 2 days expiration
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL
  })
}))
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
})

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
    // Using controllers
app.get('/login', loginController.index);
app.post('/login', loginController.post);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // handle validation errors of queries - express-validator middlewares
  if (err.array) {
    const errInfo = err.array({ })[0];
    console.log(errInfo);
    err.message = `VALUE ${errInfo.value} NOT VALID - The ${errInfo.type} [${errInfo.path}] in ${errInfo.location} ${errInfo.msg}`;
    err.status = 422;
  }

  // render the error page
  res.status(err.status || 500);

  // if error in API returns a JSON with error
  if (req.originalUrl.startsWith('/api/')) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
