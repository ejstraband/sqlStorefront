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
            buySomething();
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
function queryInventoryLevel(item, callback) {
    connection.query(("SELECT stock_quantity FROM products WHERE item_id = " + item), function(err, res) {
        if (err) throw err;
        console.log("\nLet me check for you.\n");
        var itemQuantityInStock = res[0].stock_quantity;
        console.log(itemQuantityInStock + " of these in stock\n");
        // return itemQuantityInStock;
        callback(itemQuantityInStock);
    });
}

// look up price
function lookUpItemCost(item, callback) {
    // console.log("Price Check!\n");
    connection.query(("SELECT price FROM products WHERE item_id = " + item), function(err, res) {
        if (err) throw err;
        var itemCost = res[0].price;
        console.log("$" + itemCost + ".00 Each\n");
        callback(itemCost);
    });
}
  
// adjust inventory
function adjustInventory(quantity, callback) {
    console.log("\nAdjusting inventory by: " + quantity + "\n");
    // database stuff here in a function
    // callback(); inside the function
}

// Primary Functions

// retrieve quantity
// function checkStock(item, cb1, cb2) {
//     var inStockAmount = cb1(item);
//     console.log("\n" + inStockAmount + " in stock");
//     cb2(inStockAmount)
// }

// retrieve price
// function priceCheck(item) {
//     var itemPrice = lookUpItemCost(item);
//     console.log("\nItem Price is: $" + itemPrice + ".00");
//     return itemPrice;
// }


// calculate total purchase
function calculateTotalPurchaseAmount(price, quantity) {
    totalPurchaseAmount = price * quantity;
    console.log("\nTotal Purchase Amount is: $" + totalPurchaseAmount + ".00");
    return totalPurchaseAmount;
}

// purchase function
function purchaseFunction(item, quantity, callback) {
lookUpItemCost(item, function(itemPrice){
    var totalPurchaseAmount = calculateTotalPurchaseAmount(itemPrice, quantity);
    callback();
});
// console.log(itemPrice);
// var inStockAmount = checkStock(item);
// console.log(inStockAmount);

// console.log(totalPurchaseAmount);
// return totalPurchaseAmount;
}

// capture purchase input
// buy something
function buySomething() {
    var itemToPurchase;
    var desiredQuantity;
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
        itemToPurchase = answers.item;
        desiredQuantity = parseInt(answers.quantity);
        // console.log(typeof desiredQuantity);
        console.log("\nItem_ID Selected: " + itemToPurchase + "\n");
        console.log("Desired Quantity: " + desiredQuantity + "\n");

        queryInventoryLevel(itemToPurchase, function(inStockQuantity) {
            if (desiredQuantity > inStockQuantity) {
                console.log("Apologies, we don't have enough in stock");
                chooseFunction();
            } else {
                purchaseFunction(itemToPurchase, desiredQuantity, function() {
                    adjustInventory(desiredQuantity);
                    chooseFunction();
                });

            }
        });

        
    });

  }