const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'description', 'date_created'],
      include: 
        {
          model: User,
          attributes: ['user_name'],
        },
    });
    // Serialize data so the template can read it
    const post = postData.map((post) => post.get({ plain: true }));
    
    // Pass serialized data and session flag into template
    res.render('homepage', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post', async (req, res)=>{
  // if (req.session.logged_in){
    res.render('post')
  // }
  // res.render('login')
})

router.get('/profile', async (req, res)=>{
  if (req.session.logged_in){
    res.render('profile')
  }
  res.render('login')
})

router.get('/login', (req, res) => {
  
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;