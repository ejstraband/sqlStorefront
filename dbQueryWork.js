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

// testing
itemRequested = process.argv[2];
console.log("Item to try: " + itemRequested);
currentQuantity = process.argv[3];
console.log("Quantity Requested: " + currentQuantity);

chooseFunction();


function chooseFunction() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "Pick a function",
        choices: [
          "Display Inventory",
        //   "Attempt a Purchase",
          "Direct DB Quantity Check",
        // Calculate Total
          "Calculate Purchase Total"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
          case "Display Inventory":
            displayInventory();
            break;
        //   case "Attempt a Purchase":
        //     buySomething();
        //     break;
          case "Direct DB Quantity Check":
            queryInventory();
            break;
          case "Calculate Purchase Total":
            calculatePurchaseCost();
            break;
        }
      });
  }

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
            getQuantityOnHand();
            getPrice();
            });
            
            function getQuantityOnHand() {
            connection.query(("SELECT stock_quantity FROM products WHERE item_id = " + itemRequested), function(err, res) {
                if (err) throw err;
                console.log("Quantity Object" + res);
                var resQuantJson = JSON.stringify(res);
                console.log(resQuantJson);
                // connection.end();
            });
            }

            function getPrice() {
            connection.query(("SELECT price FROM products WHERE item_id = " + itemRequested), function(err, res) {
                if (err) throw err;
                console.log("Price Object" + res);
                var resPriceJson = JSON.stringify(res);
                console.log(resPriceJson);
                connection.end();
            });
            }
    }

    // calculate purchase
    function calculatePurchaseCost() {
        var totalCost;
        connection.connect(function(err) {
            if (err) throw err;
            // console.log("connected as id " + connection.threadId);
            afterConnection();
            });
            
            function afterConnection() {
            connection.query(("SELECT price FROM products WHERE item_id = " + itemRequested), function(err, res) {
                if (err) throw err;
                console.log(res);
                var totalPurchase = res * currentQuantity;
                console.log(totalPurchase);
                connection.end();
            });
            }
    }



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
