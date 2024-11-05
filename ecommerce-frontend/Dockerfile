# Dockerfile for React Frontend

# Use an official Node.js runtime as a parent image
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./ 

# Install the dependencies
RUN npm install

# Copy the rest of your application code
COPY . . 

# Build the React application
RUN npm run build

# Use a smaller image to serve the application
FROM nginx:alpine

# Copy the built React app from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Command to run the app
CMD ["nginx", "-g", "daemon off;"]
