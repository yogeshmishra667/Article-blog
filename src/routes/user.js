const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const passport = require('passport');
const validateSchema = require('../validation/userValidate');

/*<==================== YOGI.JS =====================>*/

router.get('/user/login', async (req, res) => {
  res.render('login');
});
//login user
router.post(
  '/user/login',
  passport.authenticate('local', {
    failureRedirect: '/user/login',
  }),
  function (req, res) {
    return res.redirect('/');
  }
);

//fetch user
router.get('/register', async (req, res) => {
  res.render('register');
});
//register user
router.post('/register', async (req, res) => {
  const user = new User(req.body);
  try {
    const validationResult = validateSchema.validate(req.body, {
      abortEarly: false,
    });
    if (validationResult.error) {
      console.log(validationResult.error);
      return res.render('error', {
        error: 'please 🥺 enter correct value something was not right',
      });
    }

    const result = await user.save();
    //console.log(result);
    if (result) {
      return res.redirect('/user/login');
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/user/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
