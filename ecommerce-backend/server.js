require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection using URI and database name from .env
const client = new MongoClient(process.env.MONGO_URI);
const dbName = process.env.DB_NAME;
let productsCollection;
let cartCollection;

// MySQL connection for usernames database
const mysqlConnectionUsers = mysql.createConnection({
  host: process.env.MYSQL_USER_HOST,
  user: process.env.MYSQL_USER_USER,
  password: process.env.MYSQL_USER_PASSWORD,
  database: process.env.MYSQL_USER_DB,
});

// MySQL connection for payments database
const mysqlConnectionPayments = mysql.createConnection({
  host: process.env.MYSQL_PAYMENT_HOST,
  user: process.env.MYSQL_PAYMENT_USER,
  password: process.env.MYSQL_PAYMENT_PASSWORD,
  database: process.env.MYSQL_PAYMENT_DB,
});

// Connect to MongoDB and initialize collections
async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    productsCollection = db.collection('products');
    cartCollection = db.collection('carts');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongo();

// Endpoint to get all products from MongoDB
app.get('/api/products', async (req, res) => {
  try {
    const products = await productsCollection.find({}).toArray();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Endpoint to get cart items for a specific user
app.get('/api/cart/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await cartCollection.findOne({ userId });
    res.json(cart ? cart.items : []);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
});

// Endpoint to add items to cart
app.post('/api/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  const { productId, name, price } = req.body;

  try {
    const result = await cartCollection.updateOne(
      { userId },
      { $push: { items: { productId: new ObjectId(productId), name, price } } },
      { upsert: true }
    );

    const updatedCart = await cartCollection.findOne({ userId });
    res.json(updatedCart.items);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
});

// Endpoint to remove items from cart
app.delete('/api/cart/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;

  try {
    await cartCollection.updateOne(
      { userId },
      { $pull: { items: { productId: new ObjectId(productId) } } }
    );

    const updatedCart = await cartCollection.findOne({ userId });
    res.json(updatedCart.items);
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Failed to remove from cart' });
  }
});

// Endpoint to sign up a new user (storing plain text)
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    await new Promise((resolve, reject) => {
      mysqlConnectionUsers.query(query, [username, password], (error, results) => {
        if (error) {
          if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Username already exists, please use a different name.' });
          }
          console.error('Error inserting user into database:', error);
          return reject(error);
        }
        resolve(results);
      });
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Signup failed' });
  }
});

// Endpoint to handle sign-in
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE username = ?';
    const user = await new Promise((resolve, reject) => {
      mysqlConnectionUsers.query(query, [username], (error, results) => {
        if (error) {
          console.error('Error fetching user from database:', error);
          return reject(error);
        }
        resolve(results[0]);
      });
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ userId: user.id });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Endpoint to handle payment
app.post('/api/payment', async (req, res) => {
  const { name, address, pincode, mobileNumber } = req.body;

  try {
    const query = 'INSERT INTO payments (name, address, pincode, mobile_number) VALUES (?, ?, ?, ?)';
    await new Promise((resolve, reject) => {
      mysqlConnectionPayments.query(query, [name, address, pincode, mobileNumber], (error, results) => {
        if (error) {
          console.error('Error inserting into payments database:', error);
          reject(error);
        } else {
          console.log('Payment inserted into database:', results);
          resolve(results);
        }
      });
    });

    res.status(200).json({ message: 'Payment processed successfully' });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: 'Payment processing failed' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

