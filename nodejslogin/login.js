const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const user_route = express.Router();
const admin_route = express.Router();

app.use(bodyParser.urlencoded({ extended: true}));
app.set("view engine", "ejs");
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

//test
user_route.get('/search/FindAll', function (req, res){    
    dbConnection.query('SELECT * FROM Product', function (error, results) {
        if (error) throw error;
        return res.send({ 
            error: false, 
            data: results, 
            message: 'users list.' });
    });
});



//  Admin route


admin_route.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/html_pages/login.html'));
});

// CRUD Operation for admin

// User management part

/*  Testing getting all users information
method: get
url: http://localhost:3000/admin/users 
this give you lists of all users in the .sql file
*/

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

/* Testing getting a specific user id information
method: get
url: http://localhost:3000/admin/user/3" 
this will give you the user with the id 3

method:get 
url: http://localhost:3000/admin/user/4 
this will give you the user with the id 4
*/

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

/*  Test inserting a new user
* if you can't send raw data check your headers tab in Postman
https://stackoverflow.com/questions/58062558/postman-send-strange-response-for-raw-json-post-node-js

method: post
url: http://localhost:3000/admin/user
header: Content-Type: application/json
body: raw JSON

{
    "id":"4",
    "username":"heheboi",
    "password":"555555",
    "email":"heheboi@gmail.com"
}

method: post
url: http://localhost:3000/admin/user
header: Content-Type: application/json
body: raw JSON
{
    "id":"5",
    "username":"catto",
    "password":"123456",
    "email":"catto@gmail.com"
}

*/

// Insert a new entry
admin_route.post('/user', (req, res)=>{
    let user = req.body;
    //console.log(req.body)
    //res.send(user);
    console.log(req.body);
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

/*  Test updating an existing user
* if you can't send raw data check your headers tab in Postman
https://stackoverflow.com/questions/58062558/postman-send-strange-response-for-raw-json-post-node-js

method: put
url: http://localhost:3000/admin/user
header: Content-Type: application/json
body: raw JSON

{
    "id":"4",
    "username":"hohoboi",
    "password":"4444",
    "email":"hohoboi@gmail.com"
}

method: put
url: http://localhost:3000/admin/user
header: Content-Type: application/json
body: raw JSON
{
    "id":"5",
    "username":"batto",
    "password":"666666",
    "email":"batto@gmail.com"
}

*/

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

/* Testing delete a specific user id 
method: delete
url: http://localhost:3000/admin/user/4" 
this will delete a user with the id 4

method:get 
url: http://localhost:3000/admin/user/5
this will delete a user with the id 5
*/

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

// Product Management Part

/*  Testing getting all products information
method: get
url: http://localhost:3000/admin/products
this give you lists of all products in the .sql file
*/

// Get all products information from the database
admin_route.get('/products', function (req, res) {
    dbConnection.query('SELECT * FROM products', function (error, results) {
    if (error) throw error;
        return res.send({ 
            error: false, 
            data: results, 
            message: 'products list.' });
    });
});

/* Testing getting a specific product id information
method: get
url: http://localhost:3000/admin/product/3" 
this will give you the product information with the id 3

method:get 
url: http://localhost:3000/admin/product/4 
this will give you the product information with the id 4
*/

// Get a specific product ID from the database
admin_route.get('/product/:id', (req, res)=>{
    let id = req.params.id;
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide user id.' });
    }
    dbConnection.query('SELECT * FROM products WHERE p_id = ?', id, (err, rows, fields)=>{
        if (!err) {
            res.send(rows);
        } else {
            res.send(err);
        }
        //return res.send({ error: false, data: results[0], message: 'product retrieved' });
    })
});

/*  Test inserting a new product
* if you can't send raw data check your headers tab in Postman
https://stackoverflow.com/questions/58062558/postman-send-strange-response-for-raw-json-post-node-js

method: post
url: http://localhost:3000/admin/product
header: Content-Type: application/json
body: raw JSON

{
    "p_id":"8",
    "p_name":"Elden Ring",
    "rating":"4.9",
    "age_restriction":"18",
    "company_name":"FromSoftware",
    "p_price":"1490",
    "p_type":"Dark Fantasy",
    "p_platform":"Console"
}

method: post
url: http://localhost:3000/admin/product
header: Content-Type: application/json
body: raw JSON

{
    "p_id":"9",
    "p_name":"Dark Soul 3",
    "rating":"4.7",
    "age_restriction":"18",
    "company_name":"FromSoftware",
    "p_price":"1500",
    "p_type":"Dark Fantasy",
    "p_platform":"Console"
}
*/

// Insert a new product
admin_route.post('/product', (req, res)=>{
    let product = req.body;
    //console.log(req.body)
    //res.send(product);
    console.log(req.body);

    if (!product) {
        return res.status(400).send({ error: true, message: 'Please provide the product information' });
    }
    var sql = "INSERT INTO `products` (`p_id`, `p_name`, `rating`, `age_restriction`, `company_name`, `p_price`, `p_type`, `p_platform`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    
    dbConnection.query(sql, [product.p_id, product.p_name, product.rating, product.age_restriction, product.company_name, product.p_price, product.p_type, product.p_platform], 
        (err, rows, field)=>{
        if(!err){
            res.send('Product record successfully added');
        } else {
            res.send(err);
        }
        //eturn res.send({error: false, data: results.affectedRows, message: 'New product record has been created successfully.'});
    })
});

/*  Test updating an existing product
* if you can't send raw data check your headers tab in Postman
https://stackoverflow.com/questions/58062558/postman-send-strange-response-for-raw-json-post-node-js

method: post
url: http://localhost:3000/admin/product
header: Content-Type: application/json
body: raw JSON

{
    "p_id":"8",
    "p_name":"Elden Ring",
    "rating":"4.9",
    "age_restriction":"18",
    "company_name":"Bandai Namco Entertainment",
    "p_price":"1490",
    "p_type":"Dark Fantasy",
    "p_platform":"Console"
}

method: post
url: http://localhost:3000/admin/product
header: Content-Type: application/json
body: raw JSON

{
    "p_id":"9",
    "p_name":"Dark Soul 3",
    "rating":"4.7",
    "age_restriction":"18",
    "company_name":"Bandai Namco Entertainment",
    "p_price":"1500",
    "p_type":"Dark Fantasy",
    "p_platform":"Console"
}
*/

// Update an existing entry
admin_route.put('/product', (req, res)=>{
    let product = req.body;
    var sql = "UPDATE products SET p_name = ?, rating = ?, age_restriction = ?, company_name = ?, p_price = ?, p_type = ?, p_platform = ? WHERE p_id = ?";
    dbConnection.query(sql, [product.p_name, product.rating, product.age_restriction, product.company_name, product.p_price, product.p_type, product.p_platform, product.p_id], 
        (err, rows, fields) => {
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

/* Testing delete a specific product id 
method: delete
url: http://localhost:3000/admin/product/8" 
this will delete a product with the id 8

method:get 
url: http://localhost:3000/admin/product/9
this will delete a product with the id 9
*/

// Delete an exisiting entry
admin_route.delete('/product/:id', (req, res)=>{
    let id = req.params.id;
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide product id' });
    }
    dbConnection.query('DELETE FROM products WHERE p_id = ?',[id], (err, rows, fields)=>{
        if (!err){
            res.send("Deleted successfully")
        } else {
            res.send(err);
        }
        //return res.send({ error: false, data: results.affectedRows, message: 'Student has been deleted successfully.' });
    
    })
});

// Authentication part

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