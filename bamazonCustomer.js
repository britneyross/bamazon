var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Texas1994!",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
    }
    showProducts();
});

var totalCost = 0;
function showProducts() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.table(res);
        inquirer.prompt([
            {
                name: "choice",
                type: "input",
                message: "What is the item ID of the product you would like to order? "
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to order? ",
            }
        ]).then(function (answer) {
            connection.query("SELECT * FROM products WHERE ?",
                { item_id: answer.choice }, function (err, res) {

                    if (err) throw err;

                    if (answer.quantity > res[0].stock_quantity) {
                        inquirer
                            .prompt([
                                {
                                    type: "input",
                                    message: "Out of Stock. Would you like to place another order? ",
                                    name: "continue"
                                }
                            ]).then(function (answer) {
                                if (answer.continue == 'yes' || answer.continue == 'y') {
                                    showProducts()
                                } else if (totalCost >= 0) {
                                    console.log("Total cost of order is $", parseFloat(Math.round(totalCost * 100) / 100).toFixed(2));
                                    connection.end();
                                } else {
                                    console.log("Come again!");
                                }
                            });

                    }

                    else {
                        console.log("All items in stock!");
                        totalCost = totalCost + res[0].price * answer.quantity;
                        var newQuantity = res[0].stock_quantity - answer.quantity;
                        connection.query(`UPDATE products SET stock_quantity=${newQuantity} WHERE item_id = ${answer.choice}`, function (res) {
                            inquirer
                                .prompt([
                                    {
                                        type: "input",
                                        message: "Would you like to place another order? ",
                                        name: "continue"
                                    }
                                ]).then(function (answer) {
                                    if (answer.continue == "yes" || answer.continue == "y") {
                                        showProducts()
                                    } else {
                                        console.log("Total cost of order is $", totalCost.toFixed(2));
                                        connection.end();
                                    }
                                })
                        })
                    };
                });
        })
    })
} 