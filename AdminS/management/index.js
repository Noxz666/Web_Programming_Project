const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const router = express();
dotenv.config({ path: path.join(__dirname, './.env')});
const port = 3001;

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
    host : process.env.host,
    user : process.env.DB_user, 
    password : process.env.DB_pass, 
    database : process.env.DB_name
   });

   connection.connect(function(err)
{   
    if(err) throw err;
    console.log("Connected DB: "+ process.env.DB_name + " at port " + 3001);
    console.log("=========  Current Data  =========")
    connection.query('SELECT * FROM user_data', function (error, results) {
        if (error) throw error;
        console.log(results);
    });
    
});

router.get("/AllData", function (req, res){    
    connection.query('SELECT * FROM user_data', function (error, results) {
        if (error) throw error;
        return res.send(results);
    });
});

router.listen(3001, function(){
    console.log("Backend Started");
});