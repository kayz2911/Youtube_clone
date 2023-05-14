# Use an official Node.js runtime as a parent image
FROM node:18.16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to /app
COPY . .

# Build the production version of the app
RUN npm run build

# Serve the app on port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]