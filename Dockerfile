# Use the official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Set the command to start the Next.js server
CMD ["npm", "start"]

# Make sure the port used by Next.js is exposed
EXPOSE 3000