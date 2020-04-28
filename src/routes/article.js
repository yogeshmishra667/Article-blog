const express = require('express');
const Article = require('../models/article');
const router = new express.Router();
const validateSchema = require('../validation/joi');

/*<==================== YOGI.JS =====================>*/

router.post('/articles/add', async (req, res) => {
  const article = new Article(req.body);
  try {
    const validationResult = validateSchema.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      return res.render('error', {
        error: 'please 🥺 enter correct value something was not right',
      });
    }
    const result = await article.save();
    if (result) {
      res.redirect('/');
    }
  } catch (error) {
    return res.render('error', {
      error: 'request denied check after some time',
    });
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
    return res.render('error', {
      error: 'request denied check after some time',
    });
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
  try {
    const result = await Article.findByIdAndUpdate(
      query,
      { title, author, body },
      { new: true }
    );
    //validation using @hapi/joi
    const validationResult = validateSchema.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      return res.render('error', {
        error: 'please enter correct value ',
      });
    }
    if (result) {
      console.log('edited successfully');
      res.redirect('/');
    }
  } catch (err) {
    return res.render('error', {
      error: 'request denied  data not update',
    });
  }
});

router.get('/articles/delete/:id', async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);
  if (article) {
    res.redirect('/');
  } else {
    return res.render('error', {
      error: 'something went to wrong data can not delete',
    });
  }
});
module.exports = router;
