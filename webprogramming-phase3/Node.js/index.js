/* HTTP Module */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const router = express();

dotenv.config();
const port = 3001;

// let corsOptions = {
//     origin: 'htpp://localhost:3000',
//     method: 'GET,POST,PUT,DELETE'
// };
// router.use(cors(corsOptions));
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


/* Connection to MySQL */

var connection = mysql.createConnection({
 host : process.env.MYSQL_HOST,
 user : process.env.MYSQL_USERNAME, 
 password : process.env.MYSQL_PASSWORD, 
 database : process.env.MYSQL_DATABASE
});

/* Connect to DB */
connection.connect(function(err)
{   
    if(err) throw err;
    console.log("Connected DB: "+ process.env.MYSQL_DATABASE + " at port " + 3001);
    console.log("=========  Current Data  =========")
    connection.query('SELECT * FROM products', function (error, results) {
        if (error) throw error;
        console.log(results);
    });
    
});

//Use for geting data from SQL Database
router.get("/AllData", function (req, res){    
    connection.query('SELECT * FROM products', function (error, results) {
        if (error) throw error;
        return res.send(results);
    });
});

router.post('/Searchtype', (req, res) => { //SELECT BY Category
    let Product_Category = req.body.search.Product_Category;
    let Product = req.body.search;
    console.log(Product);
   
    let sql = "SELECT * FROM Product_info WHERE Product_Category = ?";
    connection.query(sql, [Product.Product_Category], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    })
});


//RuN!!!
router.listen(3001, function(){
    console.log("BackEnd now has been Working");
});

