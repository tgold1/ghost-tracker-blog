const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => {
//   try {
//     // const postData = await Post.findAll({
//     //   include: [
//     //     {
//     //       model: User,
//     //       attributes: ['name'],
//     //     },
//     //   ],
//     // });

    
//     // const posts = postData.map((post) => this.post.get({ plain: true }));


//     res.render('homepage', { 
//       // layout: "homepage",
//       // posts, 
//       // logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/posts/:id', async (req, res) => {
//   try {
//     const postData = await this.post.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const post = postData.get({ plain: true });

//     res.render('post', {
//       ...post,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


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

router.get('/login', (req, res) => {
  
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;