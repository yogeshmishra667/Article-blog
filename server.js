const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
require('./src/db/mongoose');
const articleRouter = require('./src/routes/article');
const userRouter = require('./src/routes/user');

//init express🍏
const app = express();

// Load View Engine🎑
const viewPath = path.join(__dirname, 'views');
app.set('views', viewPath);
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded and application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Set Public Folder 🗄
const publicPathDir = path.join(__dirname, './public');
app.use(express.static(publicPathDir)); //fot static file

/*<==================== Middleware =====================>*/
//express session for session
app.use(
  session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
//for passportJs
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

//global variable for logout access in view ==> header.ejs
app.get('*', function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

//routes
app.use(articleRouter);
app.use(userRouter);

//for run express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('express server run on port', port);
});
