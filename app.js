'use strict';

const express = require('express');
const session = require('express-session');
const userRoute = require('./routes/userRoute');
const userController = require('./controllers/userController');
const authRoute = require('./routes/authRoute');
const passport = require('./utils/pass');
const app = express();
const port = 3000;
/* const bcrypt = require('bcryptjs');
(async () => {
    const crypt = await bcrypt.hash('onerva1234', 12);
    console.log(crypt);
})(); */

// Static Files
app.use(express.static('public'));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

const loggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('index.html');
    }
};

app.get('/login', loggedIn, (req, res) => {
    if (req.session.logged === true) {
        //res.render('home');
        res.redirect('home.html')
    } else {
        res.redirect('index.html');
    }
});

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/form' }),
    (req, res) => {
        console.log('success');
        res.redirect('home.html');
    });

/* app.get('/home', function (req, res) {
    res.render('index', { name: req.userController. });
}); */

app.use('/user', passport.authenticate('jwt', { session: false }), userRoute);
app.use('/auth', authRoute);


app.listen(port, () => console.log(`Listening on port ${port}!`));
