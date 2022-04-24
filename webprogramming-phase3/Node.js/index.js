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
    console.log("AllData in progress");
    connection.query('SELECT * FROM products', function (error, results) {
        if (error) throw error;
        return res.send(results);
    });
});

router.get("/UserAllData", function (req, res){    
    console.log("UserAllData in progress");
    connection.query('SELECT * FROM user_data', function (error, results) {
        if (error) throw error;
        return res.send(results);
    });
});

// p_id: Product_ID,
// p_name: p_id,
// rating: Rating,
// age_restriction: Age_restriction,
// company_name: company_name,
// p_price: Product_price,
// p_type: Product_type,
// p_platform: Product_platform
router.post('/Insert', (req, res) => { //INSERT
    let Product = req.body.Insert_Data;
    console.log("==== Insert in progress ====");
    console.log(Product);
    let sql = "INSERT INTO products (p_id, p_name, rating, age_restriction, company_name, p_price , p_type, p_platform) VALUES (?,?,?,?,?,?,?,?)";
    connection.query(sql, [Product.p_id, Product.p_name, Product.rating, Product.age_restriction, Product.company_name, Product.p_price, Product.p_type, Product.p_platform], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    })
});
router.post('/UserInsert', (req, res) => { //INSERT
    let Userdata = req.body.Insert_Data;
    console.log("==== Insert in progress ====");
    console.log(Userdata);
    let sql = "INSERT INTO user_data (Username, UserID, NickName, Email) VALUES (?,?,?,?)";
    connection.query(sql, [Userdata.Username, Userdata.UserID, Userdata.NickName, Userdata.Email], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    })
});

router.put('/Update', (req, res) => { //Update
    let product = req.body.Update_Data;
    var sql = "UPDATE products SET p_name = ?, rating = ?, age_restriction = ?, company_name = ?, p_price = ?, p_type = ?, p_platform = ? WHERE p_id = ?";
    console.log("==== Update in progress ====");
    connection.query(sql, [product.p_name, product.rating, product.age_restriction, product.company_name, product.p_price, product.p_type, product.p_platform, product.p_id], 
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

router.put('/UserUpdate', (req, res) => { //Update
    let Userdata = req.body.Update_Data;
    var sql = "UPDATE user_data SET Username = ?, NickName = ?, Email = ? WHERE UserID = ?";
    console.log("==== Update In Progress ====");
    console.log(Userdata);
    connection.query(sql, [Userdata.Username, Userdata.NickName, Userdata.Email, Userdata.UserID], 
        (err, rows, fields) => {
        if(!err){
            res.send('Updated successfully');
            console.log('Updated');
            //console.log(rows);
        }
        else{
            res.send(err);
        }
        //return res.send({error: false, data: results.affectedRows, message: 'User has been updated successfully.'})
    })
});

router.delete('/Delete', (req, res) => { //Delete
    let Product = req.body.Delete_Data;
    console.log("==== Delete in progress ====");
    console.log(Product);        
    let sql = "DELETE FROM products WHERE p_id = ?";
    connection.query(sql, [Product.p_id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    })
});

router.delete('/UserDelete', (req, res) => { //Delete
    let Userdata = req.body.Delete_Data;
    console.log("==== Delete in progress ====");
    console.log(Userdata);        
    let sql = "DELETE FROM user_data WHERE UserID = ?";
    connection.query(sql, [Userdata.UserID], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    })
});

router.get('/AllData/:id', (req, res) => { //Select by ID
    let Product = req.body.Select_ID_Data;
    console.log("==== Select_ID in progress ====");
    console.log(Product);   
    
    let sql = "SELECT * FROM products WHERE p_id = ?";
    connection.query(sql, [Product.p_id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            res.send(error);
        }
    })
});

router.get('/UserAllData/:id', (req, res) => { //Select by ID
    let Userdata = req.body.Select_ID_Data;
    console.log("==== Select_ID in progress ====");
    console.log(Userdata);   
    
    let sql = "SELECT * FROM user_data WHERE UserID = ?";
    connection.query(sql, [Userdata.UserID], (error, results, fields) => {
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


