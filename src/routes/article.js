const express = require('express');
const Article = require('../models/article');
const router = new express.Router();

/*<==================== NOTES =====================>*/

/*when you work at index.js (directly) you are use [app.get,post] but in this 
file you are used septate route file so you used [Router.get,post] */

router.post('/articles/add', async (req, res) => {
  const article = new Article();
  try {
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    const result = await article.save();
    if (result) {
      res.redirect('/');
    }
  } catch (error) {
    console.log('something went to wrong');
  }
});
router.get('/articles/add', async (req, res) => {
  res.render('add', {
    title: 'Add article',
  });
});

router.get('/', async (req, res) => {
  try {
    const articles = await Article.find({});
    res.render('index', {
      title: 'developer blogs',
      articles: articles,
    });
  } catch (err) {
    console.log(err);
  }
});

//fetch single article
router.get('/articles/:id', async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render('article', {
    article: article,
  });
});

//for edit articles🔂
router.get('/articles/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render('edit_article', {
    article: article,
  });
});

// Update Submit POST Route
router.post('/articles/edit/:id', async (req, res) => {
  const { title, author, body } = req.body;
  const query = { _id: req.params.id };
  const result = await Article.findByIdAndUpdate(
    query,
    { title, author, body },
    { new: true }
  );
  if (result) {
    res.redirect('/');
    return;
  } else {
    console.log('something went to wrong :(');
  }
});

router.get('/articles/delete/:id', async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);
  if (article) {
    res.redirect('/');
  } else {
    console.log('something went to wrong data can not delete');
  }
});
module.exports = router;
