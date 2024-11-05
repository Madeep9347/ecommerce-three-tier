# Dockerfile for Node.js Backend

# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./ 

# Install the dependencies
RUN npm install

# Copy the rest of your application code
COPY . . 

# Expose the port your app runs on
EXPOSE 5000

# Command to start your app
CMD ["node", "server.js"]
