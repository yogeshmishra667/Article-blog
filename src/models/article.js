const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
    unique: true,
  },
  body: {
    type: String,
    trim: true,
    required: true,
  },
});

const Article = mongoose.model('Article', userSchema);

module.exports = Article;

//database collection save at name article +++ s =====> articles🔄
