CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Call of Duty", "Video Games", 19.95, 200),
("Avengers", "Films", 14.99, 150),
("Scented Candle", "Home Decor", 5.99, 300),
("Nike Shoes", "Apparel", 79.99, 50),
("Sunglasses", "Apparel", 9.99, 25),
("Canon Camera", "Electronics", 99.99, 20),
("Dell Laptop", "Electronics", 399.99, 15),
("Headphones", "Electronics", 29.99, 30),
("Knives", "Kitchenware", 39.95, 40),
("Baking Dish", "Kitchenware", 15.99, 50);