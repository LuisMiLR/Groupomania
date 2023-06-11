const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env"});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// const db = mysql.createConnection({
//     host: "localhost",  
//     user: "root",
//     password: "",
//     database: "groupomania"
// });


db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Connection successful");
    }
});


module.exports = db;