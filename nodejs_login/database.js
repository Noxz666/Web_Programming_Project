// This file reate a connection with the databse
const mysql = require("mysql2");
/*
const dbConnection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodejs_login"
}).promise()
*/

const dbConnection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodejs_login",
    port: "3306"
}).promise()

/*
dbConnection.connect((err)=>{
    if(!err)
        console.log('DB connection succeed.');
    else
        console.log('DB connection failed \n Error :' + JSON.stringify(err, undefined,1));
});
*/

module.exports = dbConnection;