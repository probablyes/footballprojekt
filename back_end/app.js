var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var meczRouter = require('./routes/meczService');
var zawodnikRouter = require('./routes/zawodnikService');
var wystepRouter = require('./routes/wystepService');
var druzynaRouter = require('./routes/druzynaService');

var app = express();
const port = 3001;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/wystepy', wystepRouter);
app.use('/mecze', meczRouter);
app.use('/zawodnicy', zawodnikRouter);
app.use('/druzyny', druzynaRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
//test połączenia do bazy danych
const db = require('./db/mysql');
db.execute('select * from zawodnicy')
    .then(([data, metadata]) => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
*/

const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'toor321',
    database : 'tin_project'
});

connection.connect();

const db = require('./db/mysql');
db.execute('select * from druzyna')
    .then(([data, metadata]) => {
        console.log('tutaj ', data);
    })
    .catch(err => {
        console.log(err);
    });

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});

connection.end();


module.exports = app;
