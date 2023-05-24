# Use an official Node.js runtime as a parent image
FROM node:18.16-alpine
# Updates the package index inside the image and installs the specified dependencies
RUN apt-get update && apt-get install -y --no-install-recommends tmux git make g++

# Sets the environment variable HOME to /home/node/webapp
ENV HOME /home/node/webapp
#This creates a directory /home/node/webapp
RUN mkdir ${HOME}
# Set the working directory to /home/node/webapp
WORKDIR ${HOME}
# Changes the ownership of the /home/node/webapp directory to the node user and group.
RUN chown -R node:node ${HOME}

# Copy the rest of the application code to /app
COPY . .
# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install --production=false
# Build the production version of the app
RUN npm run build

# Serve the app on port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]