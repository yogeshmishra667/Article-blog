const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const validateSchema = require('../validation/userValidate');

/*<==================== YOGI.JS =====================>*/

router.get('/user/login', async (req, res) => {
  res.render('login');
});
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

module.exports = router;
