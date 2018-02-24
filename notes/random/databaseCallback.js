// =========================
// Initial Application Configuration

var inquirer = require('inquirer');
var mysql = require('mysql');
var console = require('better-console');
var axios = require('axios');

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

// Initial DB Connection
connection.connect(function(err) {
  if (err) throw err;
});

// Start Application
chooseFunction();


function chooseFunction() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "Pick a function",
        choices: [
        // display inventory table
          "Display Store Inventory",
        // "Attempt a Purchase",
          "Attempt to Purchase",
        // exit out
          "Exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
          case "Display Store Inventory":
            displayInventory();
            break;
          case "Attempt to Purchase":
            startPurchase();
            break;
          case "Exit":
            process.exit(0);
        }
      });
    }

// DB Queries

// display store inventory
function displayInventory() {
    // console.log("connected as id " + connection.threadId);
    connection.query(("SELECT * FROM products"), function(err, res) {
        if (err) throw err;
        console.table(res);
        chooseFunction();
    });
}

// query quantity on hand
function queryInventoryLevel(item) {
    connection.query(("SELECT stock_quantity FROM products WHERE item_id = " + item), function(err, res) {
        if (err) throw err;
        console.log("\nLet me check for you.\n");
        var itemQuantityInStock = res[0].stock_quantity;
        console.log(itemQuantityInStock + " of these in stock\n");
        console.log("last?");
        // return itemQuantityInStock;
    });
}


// Primary Functions
function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

// buy something
function startPurchase(item, qty, callback) {
    // var itemToPurchase;
    // var desiredQuantity;
    console.log("Let's buy something!!\n");
  
    var purchaseQuestions = [
      {
        name: "item",
        type: "input",
        message: "Please choose an item_id"
      }, 
      {
        name: "quantity",
        type: "input",
        message: "How many would you like?"
      }
    ];
  
    // propmt for item selection and quantity
    inquirer.prompt(purchaseQuestions).then(answers => {
        item = answers.item;
        qty = answers.quantity;
        var inStockQuantity;
        console.log("\nItem_ID Selected: " + item + "\n");
        console.log("Desired Quantity: " + qty + "\n");

        function inventoryAmount(item2, callback) {
            result = callback(item2);
            return result;
          }

          inStockQuantity = inventoryAmount(item, queryInventoryLevel);
           console.log("is this working?: " + inStockQuantity);

        if (qty > inStockQuantity) {
            console.log("Apologies, we don't have enough in stock");
            // chooseFunction();
        } else {
            // queryInventoryLevel(itemToPurchase);
            // chooseFunction();
        }
    });

  }

