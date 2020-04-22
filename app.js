var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

//connect mongoose for mongodb

require('./lib/connectMongoose');

const i18n = require('./lib/i18nConfigure')(); //porque i18n exporta una función que configura i18n
app.use(i18n.init);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'bootstrap_template')));

//global variables
app.locals.title = 'AnunciaLOL';

//api routes

app.use('/api/ads', require('./routes/api/ads'));
app.use('/api/user', require('./routes/api/users'));
app.use('/api/documentation', require('./routes/api/documentation/swagger-doc'));


//website routes

const loginController = require('./routes/loginController');

app.use('/',      require('./routes/index'));
app.use('/view',      require('./routes/view'));
app.use('/users', require('./routes/users'));

app.get('/login', loginController.index);
app.post('/login', loginController.post);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
  //res.send({'status': res.status, 'error': err.message});
});

module.exports = app;
