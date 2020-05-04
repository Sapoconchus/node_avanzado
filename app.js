var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

//connect mongoose for mongodb
require('./services/users/coteResponder');
require('./services/image_handler/coteResponder');

const mongooseConnection = require('./lib/connectMongoose');

const i18n = require('./lib/i18nConfigure')(); //porque i18n exporta una función que configura i18n
app.use(i18n.init);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'bootstrap_template')));
app.use(logger('dev'));

//global variables
app.locals.title = 'AnunciaLOL';


const loginController = require('./routes/loginController');
//api routes

app.use('/api/ads', require('./routes/api/ads'));
app.use('/api/user', require('./routes/api/users'));
app.use('/api/documentation', require('./routes/api/documentation/swagger-doc'));
app.use('/api/login', loginController.postJWT);


//website routes

/**
 * Sistema de sesiones
 */
app.use(session({
  name: 'anunciaLOL-session',
  secret: process.env.SESSION_SECRET, //esto te lo inventas. Es para "despistar" em la cookie del user
  saveUninitialized: true,
  resave: false,
  cookie: {
    secure: false, //https solo??
    maxAge: 1000*60*60*24 //caducidad por inactividad
  },
  store: new MongoStore({mongooseConnection}),
}));

const sessionAuth = require('./lib/sessionAuth');
const basicAuth = require('./lib/basicAuth');

const privadoController = require('./routes/privadoController');

app.use('/',      require('./routes/index'));
app.use('/view', basicAuth(),     require('./routes/view'));
app.use('/users', require('./routes/users'));

app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);

app.get('/privado', sessionAuth, privadoController.index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  
  res.status(err.status || 500);
  
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


