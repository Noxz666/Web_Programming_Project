// This doesn't work for obvious reason, this will be just a skeleton
// for when the teacher taught us more about previlege seperation.

// No module is installed and created yet in this directory

// Initiating express and router modules
const express = require('express');
const app = express();

// Creating seperate router for each category
const user_route = express.Router();
const product_route = express.Router();
const admin_route = express.Router();

// Register each route
app.use("/user", user_route); //Register user_route
app.use("/admin", admin_route); //Register admin_route
app.use("/product", product_route); //Register product_route

// Main app
// Not sure when or which to use which one so I just put it here
// as a skeleton first
user_route.get('/', function (req, res){
    res.sendFile(path.join(__dirname+'/homepage.html'));
});

user_route.get('/aboutus', function (req, res){
    res.sendFile(path.join(__dirname+'/aboutus.html'));
});

user_route.get('/contactus', function (req, res){
    res.sendFile(path.join(__dirname+'/contactus.html'));
});

user_route.get('/downloadpage', function (req, res){
    res.sendFile(path.join(__dirname+'/downloadpage.html'));
});

user_route.get('/login_page', function (req, res){
    res.sendFile(path.join(__dirname+'/login_page.html'));
});

user_route.get('/register', function (req, res){
    res.sendFile(path.join(__dirname+'/register.html'));
});

user_route.get('/seach', function (req, res){
    res.sendFile(path.join(__dirname+'/search_page.html'));
});

app.use((req, res, next) => {
 console.log("404: Invalid accessed");
 res.status(404).send("Error 404: Invalid accessed");
// Can use html tag directly inside
// res.status(404).send("<h1> Hello World! in plain text </h1>");
 /* You can also change to the error HTML page */
})

// Server running on the port: 3030
app.listen(3030, function () {
 console.log("Server listening at Port 3030");
});