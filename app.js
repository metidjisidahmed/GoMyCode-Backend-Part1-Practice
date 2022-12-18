var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const generateUniqueId = require('generate-unique-id');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catsRouter = require('./routes/cats');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cats' , catsRouter )


app.get('/users/:userId' , (req, res, next) => {
    const usersDatabase=[
        {
            id : "123",
            firstName : "Metidji",
            lastName : "Sid Ahmed"
        }, {
            id : "456",
            firstName : "Mouhammed",
            lastName : "Moudden"
        }
    ]
    console.log("REQ PARAMS =", req.params)
    console.log("USER ID =", req.params.userId)
    let searchedCat = usersDatabase.filter(cat=>{
        if (cat.id==req.params.userId){
            return true
        } else{
            return false
        }
    })

    res.json({
                success : true,
                error : null,
                data : searchedCat.length === 1 ? searchedCat[0] : null
        })
})


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

module.exports = app;
