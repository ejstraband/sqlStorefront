// =========================
// Initial Application Configuration

var inquirer = require('inquirer');
var mysql = require('mysql');
var console = require('better-console');
var itemSelection;
var desiredQuantity;
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
// itemSelection = process.argv[2];
// console.log("Item to try: " + itemSelection);
// desiredQuantity = process.argv[3];
// console.log("Quantity Requested: " + desiredQuantity);

connection.connect(function(err) {
  if (err) throw err;
});

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
        // quantity query
          // "Item Quantity Check",
        // Calculate Total
          // "Item Price Check",
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
          case "Item Quantity Check":
            queryInventoryLevel();
            break;
          case "Item Price Check":
            lookUpItemCost();
            break;
          case "Exit":
            process.exit(0);
        }
      });
    }

// Functions

// display inventory
function displayInventory() {
        // console.log("connected as id " + connection.threadId);
        connection.query(("SELECT * FROM products"), function(err, res) {
          if (err) throw err;
          console.table(res);
          chooseFunction();
        });
      }

// display quantity
function queryInventoryLevel() {
      // console.log("connected as id " + connection.threadId);
      connection.query(("SELECT stock_quantity FROM products WHERE item_id = " + itemSelection), function(err, res) {
        if (err) throw err;
        console.log("Let me check for you.\n");
        var itemQuantityInStock = res[0].stock_quantity;
        console.log(itemQuantityInStock + " of these in stock\n");
        return itemQuantityInStock;
      });
    }


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
    desiredQuantity = answers.quantity;
    console.log("Item_ID Selected: " + itemToPurchase);
    console.log("Desired Quantity: " + desiredQuantity);
  
    // lookup price
    var itemToPurchasePrice = lookUpItemCost(itemToPurchase);
    console.log("Individual Cost: " + itemToPurchasePrice)
    // check stock
    var amountInStock = lookUpItemQuantityOnHand(itemToPurchase);
    // calculate purchase price
    var totalPurchasePrice = itemToPurchasePrice * desiredQuantity;
    console.log("Total Purchase Price: $" + totalPurchasePrice + ".00");

    adjustInventory(desiredQuantity);
  });

}

// look up price
function lookUpItemCost(thingToBuy) {
  console.log("Price Check!\n");
  connection.query(("SELECT price FROM products WHERE item_id = " + thingToBuy), function(err, res) {
    if (err) throw err;
    var itemPrice = res[0].price;
    console.log("$" + itemPrice + ".00 Each\n");
    // chooseFunction();
});
}

// look up quantity in stock
function lookUpItemQuantityOnHand(itemToPurchase) {
  console.log("Checking Quantity!\n");
  connection.query(("SELECT stock_quantity FROM products WHERE item_id = " + itemToPurchase), function(err, res) {
    if (err) throw err;
    var itemStockCount = res[0].stock_quantity;
    console.log(itemStockCount + " in stock");
    // chooseFunction();
});
}

// adjust inventory totals
function adjustInventory(desiredQuantity) {
  console.log("adjusting inventory by: " + desiredQuantity);

  

  process.exit(0);

}


    // lookup price
    var itemToPurchasePrice = lookUpItemCost(itemToPurchase);
    console.log("Individual Cost: " + itemToPurchasePrice)
    // check stock
    var amountInStock = lookUpItemQuantityOnHand(itemToPurchase);
    // calculate purchase price
    var totalPurchasePrice = itemToPurchasePrice * desiredQuantity;
    console.log("Total Purchase Price: $" + totalPurchasePrice + ".00");

    adjustInventory(desiredQuantity);