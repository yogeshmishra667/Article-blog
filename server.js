const express = require('express');
const app = express();

const path = require('path');
require('./src/db/mongoose');
const articleRouter = require('./src/routes/article');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(articleRouter);

const port = process.env.PORT || 3000;

const viewPath = path.join(__dirname, 'views');
app.set('views', viewPath);
app.set('view engine', 'ejs');

//load static [css img] file 🗄
const publicPathDir = path.join(__dirname, './public');
app.use(express.static(publicPathDir)); //fot static file

app.listen(port, () => {
  console.log('yogi express server run on port', port);
});
