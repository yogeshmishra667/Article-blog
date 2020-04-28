const express = require('express');
const session = require('express-session');
//const flash = require('connect-flash');
const path = require('path');
require('./src/db/mongoose');
const articleRouter = require('./src/routes/article');

//init express🍏
const app = express();

// Load View Engine🎑
const viewPath = path.join(__dirname, 'views');
app.set('views', viewPath);
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded and application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(articleRouter);

//Set Public Folder 🗄
const publicPathDir = path.join(__dirname, './public');
app.use(express.static(publicPathDir)); //fot static file

/*<==================== Middleware =====================>*/
//express session for session
app.use(
  session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('yogi express server run on port', port);
});
