# Use an official Node.js image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install -g expo-cli && npm install

# Copy the entire project
COPY . .

# Expose Expo and Metro Bundler ports
EXPOSE 8081 19000 19001 19002

# Start Expo server by default
CMD ["npx", "expo", "start"]
