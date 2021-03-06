
// Require packages
var mysql = require("mysql");
var inquire = require("inquirer");

var connection = mysql.createConnection({
  host: 'localhost',
  user: "root",
  port: 3306,
  password : "",
  database : "bamazon_db"
});

// Makes the connection to database
connection.connect(function(err, results, fields) {

			if (err) throw err;

			console.log("connection as ID " + connection.threadId);

			// Runs the customer view logic
			logItems();

		});


// End Connection
function quit() {
	connection.end();
}

// Function to run the logic and intitialize the chooseProduct function
function logItems() {
	connection.query("Select item_id, product_name, price FROM products", function(err, res){
		console.log("\nWelcome to Bamazon\nCheck out what's in stock.\n");
		console.log("----------------------------------------------");
		for (i = 0; i < res.length; i++) {
			console.log(res[i].item_id, res[i].product_name, res[i].price);
		};
		console.log("----------------------------------------------\n");
		chooseProduct();
	});
}

// Takes inputs and then passes them through a query call
function chooseProduct() {
	inquire.prompt([

	{
		name: "id",
		message: "Choose an item ID"
	},
	{
		name: "quantity",
		message: "How many would you like?"
	}

	]).then(function(answers){

		// Select the row that matched our id input
		connection.query("Select * FROM products WHERE ?",
		 
		 {
		 	item_id: answers.id
		 },
		 function(err, res) {

		 	// Storing the item (row) selected as object
		 	var item = res[0];

			if (err) throw err;

			// Theres only one item in our object since we are only selecting one row

			// Optional: If we want to display # in stock
			// console.log("# of items in stock: " + item.stock_quantity);

			var stock = item.stock_quantity;

			// Evaluates if theres enough quantity
			if (answers.quantity > stock) {
				console.log("Insufficient quantity");
				quit();
			} else {

				// If theres enough stock
				stock -= answers.quantity;
				console.log("\nStock remaining: " + stock);

				// Updates the database
				connection.query("UPDATE products SET ? WHERE ?",

					[{
						stock_quantity: stock
					},
					{
						item_id: answers.id
					}],
					function(err, res) {
						console.log("\n" + answers.quantity, "Item(s) purchased");
						console.log("Total Cost: $" + (item.price * answers.quantity).toFixed(2) + "\n");
						quit();
					}

				);
			}
		});

	});
};

