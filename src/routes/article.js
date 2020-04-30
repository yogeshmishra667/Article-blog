const express = require('express');
const Article = require('../models/article');
const User = require('../models/user');
const router = new express.Router();
const validateSchema = require('../validation/joi');

/*<==================== YOGI.JS =====================>*/

router.post('/articles/add', async (req, res) => {
  const article = new Article(req.body);
  article.author = req.user._id; //take id of user access control
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
    console.log(error);
    return res.render('error', {
      error: 'request denied check after some time',
    });
  }
});
router.get('/articles/add', ensureAuthenticated, async (req, res) => {
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

  const user = await User.findById(article.author);
  //article.author._id take id 🔼 fetch user using id and set author name
  res.render('article', {
    article: article,
    author: user.name, //set user name as a author
  });
});

//for edit articles🔂
router.get('/articles/edit/:id', ensureAuthenticated, async (req, res) => {
  const article = await Article.findById(req.params.id);
  //if author not match then can't edit post
  if (article.author != req.user.id) {
    return res.redirect('/');
  }
  res.render('edit_article', {
    article: article,
  });
});

// Update Submit POST Route
router.post('/articles/edit/:id', async (req, res) => {
  const { title, author, body } = req.body;
  const id = { _id: req.params.id };
  try {
    const result = await Article.findByIdAndUpdate(
      id,
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
  console.log(req.user.id);
  if (!req.user._id) {
    //if article id not match then it can't delete post
    return res.redirect('/');
  }
  const article = await Article.findByIdAndDelete(req.params.id);
  if (article) {
    res.redirect('/');
  } else {
    return res.render('error', {
      error: 'something went to wrong data can not delete',
    });
  }
});

// Access Control || for protect any route
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/user/login');
  }
}
module.exports = router;
