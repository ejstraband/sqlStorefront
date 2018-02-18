// =========================
// Initial Application Configuration

var inquirer = require('inquirer');
var mysql = require('mysql');
var console = require('better-console');

// =========================
// sql setup
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "yourpassword",
    database: "bamazon"
  });
// =========================

// dotenv configs for later
// =========================
// var db = require('dotenv').config();

// var db = require('db');
// db.connect({
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS
// })
// =========================





// =========================
// APPLICATION WALK THROUGH

    // display inventory
    displayInventory();
    // prompt the user for input
        // What product ID would you like?
        // How many?

    // purchase operation
        // function to check stock
            // not enough in stock
                // console.log("Sorry, Insufficient quantity!");
            // yes
                // function to update store quantity total
                // function to calculate the total purchase price
                // show a "receipt" with the total purchase price

    // display inventory

    // prompt the user for input

// =========================

// =========================
// Functions

    // display inventory
    function displayInventory() {
        connection.connect(function(err) {
            if (err) throw err;
            // console.log("connected as id " + connection.threadId);
            afterConnection();
          });
          
          function afterConnection() {
            connection.query("SELECT * FROM products", function(err, res) {
              if (err) throw err;
              console.table(res);
            //   for (var i=0; i<res.length; i++) {
            //     console.log("==========");
            //     console.log("Item ID : " + res[i].item_id);
            //     console.log("Name : " + res[i].product_name);
            //     console.log("Department : " + res[i].department_name);
            //     console.log("Price : $" + res[i].price + ".00");
            //     console.log("In Stock : " + res[i].stock_quantity);
            //     console.log("==========");
            // }
              connection.end();
            });
          }
    }


    // user prompt

    // stock check

    // adjust stock based on purchase

    // calculate order total
// =========================
