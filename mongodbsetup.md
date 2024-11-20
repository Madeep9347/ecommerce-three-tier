
# MongoDB Setup for Ecommerce Project

This guide will walk you through setting up MongoDB on your Ubuntu machine and configuring the necessary collections for the ecommerce project.

## Prerequisites
- A running Ubuntu server (18.04+ recommended).
- A user with `sudo` privileges.

## Step-by-Step Setup

### Step 1: Update the Package List
First, update your system's package list to ensure all your repositories are up-to-date.

```bash
sudo apt update
```

### Step 2: Add the MongoDB GPG Key
To authenticate MongoDB packages, add the GPG key for MongoDB.

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
```

### Step 3: Add the MongoDB Repository
Add the MongoDB 6.0 repository to your APT sources list.

```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

### Step 4: Update Package List Again
Now update your package list to include the MongoDB repository.

```bash
sudo apt update
```

### Step 5: Install MongoDB
Install MongoDB using the following command.

```bash
sudo apt install -y mongodb-org
```

### Step 6: Enable MongoDB to Start on Boot
Enable the MongoDB service to start on boot.

```bash
sudo systemctl enable mongod
```

### Step 7: Start the MongoDB Service
Start MongoDB service using the following command.

```bash
sudo systemctl start mongod
```

### Step 8: Check the MongoDB Status
Check the status of MongoDB to ensure it's running properly.

```bash
sudo systemctl status mongod
```

If MongoDB is running, you should see an output indicating that the service is active.

### Step 9: Install MongoDB Shell
Install the MongoDB shell if it isn't already installed.

```bash
sudo apt install -y mongodb-org-shell
```

### Step 10: Access MongoDB Shell
Once MongoDB is installed, you can enter the MongoDB shell using the following command:

```bash
mongosh
```

### Step 11: Set Up Ecommerce Database

After entering the MongoDB shell, follow these steps to create the necessary collections for the ecommerce project.

1. **Switch to the `ecommerce` Database:**

```javascript
use ecommerce;
```

2. **Create the `products` Collection:**

```javascript
db.createCollection('products');
```

3. **Create the `carts` Collection:**

```javascript
db.createCollection('carts');
```

4. **Insert Sample Products into the `products` Collection:**

```javascript
db.products.insertMany([
  { name: 'Product 1', price: 100 },
  { name: 'Product 2', price: 200 }
]);
```

### Step 12: Configure MongoDB to Bind to All Network Interfaces

To allow connections to MongoDB from external IPs (e.g., from your Docker container or another machine), modify the `bindIp` setting in the MongoDB configuration.

1. Open the MongoDB configuration file `/etc/mongod.conf` using a text editor like `nano`.

```bash
sudo nano /etc/mongod.conf
```

2. Look for the `bindIp` setting under the `net` section and change it to `0.0.0.0` to allow connections from any network interface.

```yaml
net:
  bindIp: 0.0.0.0  # Bind to all network interfaces
  port: 27017
```

3. Save and exit the editor (`Ctrl + O` to save, then `Ctrl + X` to exit).

4. Restart MongoDB to apply the changes:

```bash
sudo systemctl restart mongod
```

## Conclusion
MongoDB is now set up, configured to accept connections from any network interface, and your `ecommerce` database is ready to be used with the `products` and `carts` collections populated with sample data.

If you encounter any issues, make sure that MongoDB is running by checking the service status:

```bash
sudo systemctl status mongod
```

You can also refer to the official [MongoDB Documentation](https://docs.mongodb.com/) for more detailed information.
