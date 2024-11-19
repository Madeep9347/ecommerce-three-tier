
# MySQL Setup Guide for Database EC2 Instance

## Step 1: SSH into Your Database Instance
1. SSH into your frontend (bastion_host) instance and add the `.pem` file to your local machine.
2. Give the appropriate permissions to the `.pem` file:
   ```bash
   chmod 400 <your-pem-file.pem>
   ```
3. SSH into the database EC2 instance using the following command:
   ```bash
   ssh -i <your-pem-file.pem> ubuntu@<database-instance-public-ip>
   ```

## Step 2: Update the Package Index
Run the following command to update the package index on the EC2 instance:
```bash
sudo apt update
```

## Step 3: Install MySQL Server
Install MySQL Server with the following command:
```bash
sudo apt install mysql-server -y
```

## Step 4: Secure MySQL Installation
Run the MySQL secure installation script to configure security options, including setting the root password:
```bash
sudo mysql_secure_installation
```
Follow the prompts and choose the options that best fit your security requirements.

## Step 5: Enable and Start MySQL Service
Enable MySQL to start automatically at boot time, and start the MySQL service:
```bash
sudo systemctl enable mysql
sudo systemctl start mysql
```

## Step 6: Verify MySQL Installation
Check the status of the MySQL service to ensure it's active and running:
```bash
sudo systemctl status mysql
```

## Step 7: Log in to MySQL
Log in to MySQL as the root user:
```bash
sudo mysql -u root -p
```
Enter the root password that you set during the secure installation process.

## Step 8: Create a New Database and User
1. Create a new database:
   ```sql
   CREATE DATABASE your_database_name;
   ```
2. Create a new MySQL user and grant privileges:
   ```sql
   CREATE USER 'your_username'@'%' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON *.* TO 'your_username'@'%';
   ```
   Replace `your_username` and `your_password` with your desired username and password.

## Step 9: Allow Remote Connections (Optional)
If you want to allow remote connections to your MySQL server, follow these steps:
1. Open the MySQL configuration file:
   ```bash
   sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
   ```
2. Find the line containing `bind-address` and change it to:
   ```ini
   bind-address = 0.0.0.0
   ```
3. Save the changes and restart MySQL:
   ```bash
   sudo systemctl restart mysql
   ```

## Step 10: Access MySQL Remotely
To connect to MySQL remotely, use the following command from your local machine:
```bash
mysql -h <database-ip> -u <username> -p
```
You will be prompted for the password of the MySQL user you created.

## Step 11: Create Required Tables
Once logged into MySQL, switch to the database you created:
```sql
USE <your-database>;
```
Create the `payments` and `users` tables with the following commands:

1. Create the `payments` table:
   ```sql
   CREATE TABLE payments (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     address TEXT NOT NULL,
     pincode VARCHAR(20) NOT NULL,
     mobile_number VARCHAR(15) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

2. Create the `users` table:
   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(255) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### Conclusion
Your MySQL server is now set up and configured with the necessary tables (`payments` and `users`). You can now proceed with inserting data into these tables and using the database in your application.
