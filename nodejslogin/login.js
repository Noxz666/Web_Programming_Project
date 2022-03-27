const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const user_route = express.Router();
const admin_route = express.Router();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
// Use this to find html_pages folder in the root folder (nodejslogin, in this case)
app.use(express.static(path.join(__dirname, "html_pages")));

const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "web_project",
    port: "3306"
});

dbConnection.connect((err) => {
    if(!err)
    console.log('Database connection succeed.');
    else
    console.log('Database connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use("/", user_route); // user_route
app.use("/admin", admin_route); //admin_route

/*
// Redirect anyone to user route
app.get('/', (req, res) => {
    res.redirect('/user');
});
*/

user_route.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/html_pages/homepage.html'));
});

user_route.get('/aboutus', function (req, res){
    res.sendFile(path.join(__dirname + '/html_pages/aboutus.html'));
});

user_route.get('/contactus', function (req, res){
    res.sendFile(path.join(__dirname + '/html_pages/contactus.html'));
});

user_route.get('/downloadpage', function (req, res){
    res.sendFile(path.join(__dirname + '/html_pages/downloadpage.html'));
});

user_route.get('/homepage', function (req, res){
    res.sendFile(path.join(__dirname + '/html_pages/homepage.html'));
    if(req.session.loggedin) {
        res.send("Welcome back, " + req.session.username + '!, Click here to return to homepage <a href="/homepage.html">Homepage</a>');
    } else {
        res.send("Please login to view this page");
    }
    res.end();
});

user_route.get('/login_page', function (req, res){
    res.sendFile(path.join(__dirname + '/html_pages/login_page.html'));
});

user_route.get('/register', function (req, res){
    res.sendFile(path.join(__dirname + '/html_pages/register.html'));
});

user_route.get('/search', function (req, res){
    res.sendFile(path.join(__dirname + '/html_pages/search_page.html'));
});

// Admin route

admin_route.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/html_pages/login.html'));
});

// CRUD Operation for admin

// Get all users information from the database
admin_route.get('/users', function (req, res) {
    dbConnection.query('SELECT * FROM users', function (error, results) {
    if (error) throw error;
        return res.send({ 
            error: false, 
            data: results, 
            message: 'users list.' });
    });
});

// Get a specific user ID from the database
admin_route.get('/user/:id', (req, res)=>{
    let id = req.params.id;
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide user id.' });
    }
    dbConnection.query('SELECT * FROM users WHERE id = ?', id, (err, rows, fields)=>{
        if (!err) {
            res.send(rows);
        } else {
            res.send(err);
        }
        //return res.send({ error: false, data: results[0], message: 'user retrieved' });
    })
});

// Insert a new entry
admin_route.post('/user', (req, res)=>{
    let user = req.body;
    //console.log(req.body)
    //res.send(user);
    if (!user) {
        return res.status(400).send({ error: true, message: 'Please provide user information' });
    }
    var sql = "INSERT INTO users (id, username, password, email) VALUES (?, ?, ?, ?)"
    
    dbConnection.query(sql, [user.id, user.username, user.password, user.email], (err, rows, field)=>{
        if(!err){
            res.send('User successfully added');
        } else {
            res.send(err);
        }
        //eturn res.send({error: false, data: results.affectedRows, message: 'New user has beencreated successfully.'});
    })
});

// Update an existing entry
admin_route.put('/user', (req, res)=>{
    let user = req.body;
    var sql = "UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?";
    dbConnection.query(sql, [user.username, user.password, user.email, user.id], (err, rows, fields)=>{
        if(!err){
            res.send('Updated successfully');
            //console.log(rows);
        }
        else{
            res.send(err);
        }
        //return res.send({error: false, data: results.affectedRows, message: 'User has been updated successfully.'})
    })
});

// Delete an exisiting entry
admin_route.delete('/user/:id', (req, res)=>{
    let id = req.params.id;
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide user id' });
    }
    dbConnection.query('DELETE FROM users WHERE id = ?',[req.params.id], (err, rows, fields)=>{
        if (!err){
            res.send("Deleted successfully")
        } else {
            res.send(err);
        }
        //return res.send({ error: false, data: results.affectedRows, message: 'Student has been deleted successfully.' });
    
    })
});

// User authentication part
app.post('/user-auth', (req, res) => {
    //res.send(req)
    var username = req.body.username;
    var password = req.body.password;
    //console.log(req)
    //console.log(req.body)
    if (username && password) {
        dbConnection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results, field) => {
            if(results.length > 0){
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/homepage');
            } else {
                res.send('Incorrect username or password');  
            }
            res.end()
        });
    } else {
        res.send("Please enter username and password");
        res.end();
    }
})

// Admin authentication part
app.post('/admin-auth', (req, res) => {
    //res.send(req)
    var username = req.body.username;
    var password = req.body.password;
    //console.log(req)
    //console.log(req.body)
    if (username && password) {
        dbConnection.query('SELECT * FROM Admin WHERE username = ? AND password = ?', [username, password], (error, results, field) => {
            if(results.length > 0){
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/homepage.html');
                console.log("Admin login successfully")
            } else {
                res.send('Incorrect username or password');  
            }
            res.end()
        });
    } else {
        res.send("Please enter username and password");
        res.end();
    }
})

// If invalid url
app.use((req, res, next) => {
 console.log("404: Invalid accessed");
 res.status(404).send("Error 404: Invalid accessed");
// Can use html tag directly inside
// res.status(404).send("<h1> Hello World! in plain text </h1>");
 /* You can also change to the error HTML page */
})

app.listen(3000);