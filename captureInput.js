var inquirer = require('inquirer');

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
    // console.log("Item_ID Selected: " + itemToPurchase);
    // console.log("Desired Quantity: " + desiredQuantity);
    return itemToPurchase;
    return desiredQuantity;
  });