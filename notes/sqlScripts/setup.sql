-- make and use database 
create database bamazon;

use bamazon;

-- create products table 
create table products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	
	product_name VARCHAR(30) NOT NULL,

	department_name VARCHAR(30) NOT NULL,
    
    price INTEGER(10) NOT NULL,

	stock_quantity INTEGER (10) NOT NULL,
    
    PRIMARY KEY (item_id)
);

-- set initial stock 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( "Pencils", "Office Supplies", 1, 100 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( "Pens", "Office Supplies", 3, 100 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( "Paper", "Office Supplies", 10, 50 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( "iPad", "Computers", 329, 10 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( "Apple Pencil", "Computers", 100, 10 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( "Coffee Cup", "Kitchenware", 5, 75 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( "Cookies", "Snacks", 2, 150 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( "Work Gloves", "Hardware", 5, 90 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( "Car Battery", "Automotive", 50, 15 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ( "Hoodie", "Clothing", 25, 35 );

