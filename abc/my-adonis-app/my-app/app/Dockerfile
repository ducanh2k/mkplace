# Stage 1: Build the application
FROM node:16-alpine 

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:16-alpine

WORKDIR /my-app/src/app

# Copy only the necessary files from the build stage
COPY --from=builder /my-app/src/app/build ./build
COPY --from=builder /my-app/src/app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose port
EXPOSE 3333

# Command to run the application
CMD ["node", "build/server.js"]
# Stage 1: Build the application
FROM node:16-alpine AS builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:16-alpine

WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose port
EXPOSE 3333

# Command to run the application
CMD ["node", "build/server.js"]
