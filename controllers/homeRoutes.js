require('dotenv').config();
const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/login', (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/user');
            return;
        }
        res.render('login', {
            id: req.session.user_id,
            loggedIn: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', (req, res) => {
    try {
        res.render('dashboard', {
            id: req.session.user_id,
            loggedIn: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



router.get('/signup', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/user');
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