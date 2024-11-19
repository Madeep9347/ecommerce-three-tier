Step 1: SSH into your database instance
SSH into your frontend(bastion_host) instance and add the .pem file and give permissions to the pem file using chmod 400 <your pem file> .
SSH into database ec2 instance using this pem file.
Step 2: Update the Package Index
sudo apt update
Step 3: Install MySQL Server
sudo apt install mysql-server -y
Step 4: Secure MySQL Installation
sudo mysql_secure_installation
You'll be prompted to set up the root password and configure other security settings. Follow the prompts and choose the options that best fit your security requirements.
Step 5: Enable and Start MySQL Service
sudo systemctl enable mysql
sudo systemctl start mysql
Step 6: Verify MySQL Installation
sudo systemctl status mysql
You should see that the MySQL service is active and running.
Step 7: Log in to MySQL
sudo mysql -u root -p
Enter the password you set during the secure installation process if not just click enter
Step 8: Create a New Database and User
Create a new database:
CREATE DATABASE your_database_name;
Create a new user and grant privileges:
CREATE USER 'your_username'@'%' IDENTIFIED BY 'your_password';
grant all privileges on *.* to 'parsa'@'localhost';
GRANT ALL PRIVILEGES ON *.* to ' your_username'@'%';
Step 9: Allow Remote Connections (Optional)
If you want to allow remote connections to your MySQL server, you need to edit the MySQL configuration file:
Open the MySQL configuration file:
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
Find the line with bind-address and change it:
conf
bind-address = 0.0.0.0
Save and close the file, then restart MySQL:
sudo systemctl restart mysql
Now your MySQL server should be set up and accessible.
Login to mysql using 
mysql -h <database-ip> -u <username> -p
you will enter into mysql server
use the created database-name
USE <your-database>;
CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  pincode VARCHAR(20) NOT NULL,
  mobile_number VARCHAR(15) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
