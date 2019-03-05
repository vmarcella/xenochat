require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');

// Require our db
const db = require('./data/xeno-db');

// Connect to db
db.connect('mongodb://localhost/xenodb');

// Register custom routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const appController = require('./controllers')

const socketSetup = require('./sockets');

const app = express();
const server = http.Server(app);

// Setup the sockets for the server;
socketSetup.createSocket(server);

// Register middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register routes for endpoints
app.use('/', appController);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).json(res.locals);
});


// Listen for when a connection is opened
server.listen(process.env.PORT || 8000, () => {
    console.log('Server is active')
})

module.exports = app;
