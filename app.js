const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

// * Importacao das rotas 
const indexRouter = require('./src/routes/index-route');
const jsonFileUploadRouter = require('./src/routes/jsonFileUpload-route');

var app = express();

//-------------------------------------------------------------------
// view engine setup
//-------------------------------------------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//middleware for CORS requests
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//Liberando as rotas para uso
//tentar colocar isso junto das rotas
app.use(indexRouter);
app.use(jsonFileUploadRouter);

console.log('Rotas carregadas em app.js');

// ?================================================================
// ? Tratamento de erro
// ?================================================================

// Deixar comentado.. Provoca erro 404 no swagger...
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// Deixar comentado.. Provoca erro 404 no swagger...
// app.get("/:universalURL", (req, res) => {
//     res.send("404 URL NOT FOUND");
// });

// error handler
app.use(function (err, req, res, next) { // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
