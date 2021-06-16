require('dotenv').config();
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/dashboard', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', {
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('single-post', { post,
        loggedIn: req.session.logged_in,});
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/login', (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
    res.render('login', {
      user_id: req.session.user_id,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', (req, res) => {
  try {
    res.render('new-post', {
      user_id: req.session.user_id,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
/* router.get('/new', (req, res) => {
    try {
        if (req.session.logged_in) {
            res.send('l;jkasdfklj')
            res.render('new-post');
        }
        res.redirect('/login');
    } catch (err) {
        res.status(500).json(err);
    }
}); */

router.get('/signup', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
    res.render('signup', {
      id: req.session.user_id,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', (req, res) => {
  try {
    res.render('homepage', {
      id: req.session.user_id,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('*', async (req, res) => {
  try {
    res.render('404');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
