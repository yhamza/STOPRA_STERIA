# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy built files and necessary resources from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package*.json ./

# Set the environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
