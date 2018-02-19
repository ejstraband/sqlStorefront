// =========================
// Initial Application Configuration

var inquirer = require('inquirer');
var mysql = require('mysql');
var console = require('better-console');
var currentSelection;
var currentQuantity;
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

// testing
itemRequested = process.argv[2];
console.log("Item to try: " + itemRequested);

chooseFunction();


function chooseFunction() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "Pick a function",
        choices: [
          "Display Inventory",
          "Attempt a Purchase",
          "Direct DB Quantity Check"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
          case "Display Inventory":
            displayInventory();
            break;
          case "Attempt a Purchase":
            buySomething();
            break;
          case "Direct DB Quantity Check":
            queryInventory();
            break;
        }
      });
  }


// =========================
// APPLICATION WALK THROUGH

    // display inventory

    // prompt the user for input
        // What product ID would you like?
        // displayInventory();
        // itemSelect()
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

// prompt for app testing
//   display an ID for an item


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
              connection.end();
              chooseFunction();
            });
          }
    }

    // query inventory level
    function queryInventory() {
        connection.connect(function(err) {
            if (err) throw err;
            // console.log("connected as id " + connection.threadId);
            afterConnection();
            });
            
            function afterConnection() {
            connection.query(("SELECT stock_quantity FROM products WHERE item_id IS " + itemRequested), function(err, res) {
                if (err) throw err;
                console.log(res);
                connection.end();
            });
            }
    }

    function buySomething() {
        console.log("Let's get that order going!");
        // var itemRequested;
        var quantityRequested;
        var quantityAvailable;

        inquirer
            .prompt([
                {
                    name: "itemNumber",
                    type: "input",
                    message: "Please choose your item number."
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like?"
                }
            ])
            .then(function(answer) {
                itemRequested = answer.itemNumber;
                console.log("Item Number: " + itemRequested);
                quantityRequested = answer.quantity;
                console.log("Quantity Requested: " + quantityRequested);
            })
            
    }

    // user prompt
    // function itemSelect() {
    //     inquirer
    //       .prompt(
    //         {
    //         name: "item_id",
    //         type: "input",
    //         message: "What product would you like to buy? Please input an Item_ID\n\n"
    //         },
    //         {
    //         name: "quantity",
    //         type: "input",
    //         message: "How many woud you like?\n\n"
    //         }
    //     ).then(function(answer) {
    //         currentSelection = answer.item_id;
    //         console.log("Item ID Selected: " + currentSelection);
    //       });
        //   checkInventory();
    //   }

    // stock check
    // function checkInventory() {
    //     connection.connect(function(err) {
    //         if (err) throw err;
    //         // console.log("connected as id " + connection.threadId);
    //         afterConnection();
    //       });
          
    //       function afterConnection() {
    //         connection.query("SELECT stock_quantity FROM products WHERE item_id IS " + currentSelection, function(err, res) {
    //           if (err) throw err;
    //           console.table(res);
    //           connection.end();
    //         });
    //       }
    // }


    // adjust stock based on purchase

    // calculate order total
// =========================
