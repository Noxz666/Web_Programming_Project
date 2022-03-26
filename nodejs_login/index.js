// Importing modules
const express = require("express");
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const dbConnection = require('./database')
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.urlencoded({ extended: false}))

app.set('views', path.join(__dirname, 'views'));
// Set template engine to be view engine
app.set('view engine', 'ejs')

app.use(cookieSession({
    name: 'session',
    keys:['key1', 'key2'],
    maxAge: 3600 * 1000 // 1hr
}))

// Declaring Custom Middleware
const ifNotLoggedIn = (req, res, next) => {
    // Check if the user is logged in or not, if not render login-register page
    if (!req.session.isLoggedIn) {
        return res.render('login-register');
    }
    // use next() for middleware
    next();
}

const ifLoggedIn = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/home')
    }
    // use next() for middleware
    next();
}

// root page
app.get('/', ifNotLoggedIn, (req, res, next) => {
    dbConnection.execute("SELECT name FROM users WHERE id = ?", [req.session.userID])
    .then(([rows]) => {
        res.render('home', {
            name: rows[0].name
        })
    })
})

// Register Page, app.post must match with action in the form 
app.post('/register', ifLoggedIn, [
    //From form name="user_email"
    // If the email is invalid, return 'Invalid Email Address!'
    body('user_email', 'Invalid Email Address!').isEmail().custom((value) => {
        // If the email is valid, check if the email already exist in the database or not,
        // email is the value in this case
        return dbConnection.execute('SELECT email FROM users WHERE email = ?', [value])
        .then(([rows]) => {
            // If the query return more than 0 row, it means that it already exist
            if (rows.length > 0) {
                return Promise.reject('This email already in use!');
            }
            return true;
        })
    }),
    // If the user_name is empty then return 'Username is empty!'
    // We trim it to eliminate space
    body('user_name', 'Username is empty!').trim().not().isEmpty(),
    // Similar approach in password, but we limit minimum length using .isLength to be 6 character
    body('user_pass', 'The password must be of minimum length 6 characters').trim().isLength({ min: 6 }),
], // end of post data validation
    (req, res, next) => {
        const validation_result = validationResult(req);
        const { user_name, user_pass, user_email } = req.body;

        if (validation_result.isEmpty()) {
            bcrypt.hash(user_pass, 12).then((hash_pass) => {
                dbConnection.execute("INSERT INTO users (name, email, password) VALUES(?, ?, ?)", [user_name, user_email, hash_pass])
                .then(result => {
                    res.send(`Your account has been created successfully, Now you can <a href="/">Login</a>`)
                }).catch(err => {
                    if(err) throw err;
                })
            }).catch(err => {
                if (err) throw err;
            })
        } else {
            console.log(validation_result);
            let allErrors = validation_result.error.map((error) => {
                return error.msg;
            })
            
            res.render('login-register', {
                register_error: allErrors,
                old_data: req.body
            })
        }
    })

app.listen(3000, () => console.log("Server is running..."))