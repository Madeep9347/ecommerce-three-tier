step 1: sudo apt update
step 2: wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add 
step 3: echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
step 4: sudo apt update
step 5: sudo apt install -y mongodb-org
step 6: sudo systemctl enable mongod
step 7 : sudo systemctl start mongod
step 8 : sudo systemctl status mongod
step 9: sudo apt install -y mongodb-org-shell
step 10 : mongosh
in the mongoshell run these commands

use ecommerce
db.createCollection('products');
db.createCollection('carts');
db.products.insertMany([
  { name: 'Product 1', price: 100 },
  { name: 'Product 2', price: 200 }
]);


