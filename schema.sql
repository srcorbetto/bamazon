DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(

	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50),
	department_name VARCHAR(50),
	price DECIMAL(6,2),
	stock_quantity INTEGER(6),
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("10cm Wax Wick (10 ct)", "Fuses", 3.99, 1000),
("The Long John", "Fuses", 4.99, 300),
("Classic Grey Gun Powder (32 oz)", "Combustables", 15.99, 500),
("Boom Jelly (12 oz)", "Combustables", 19.99, 200),
("8 oz Plastic Silo", "Containers", 9.99, 500),
("16 oz Plastic Silo", "Containers", 15.99, 2000),
("The Trojan Horse (100 oz)", "Containers", 32.99, 100),
("Smoke Bomb", "Pre-built", 7.99, 1500),
("The Stink Bug", "Pre-built", 12.99, 400),
("Old Faithful", "Self-Assembly", 19.99, 600);