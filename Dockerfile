# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Install dependencies first for caching
COPY package.json package-lock.json ./
RUN npm install --ignore-scripts

# Copy source code
COPY . .

# Build the project
RUN npm run build

# Expose port if needed (not required for stdio based MCP, but if needed can expose an arbitrary port)
# EXPOSE 3000

# Run the MCP server
CMD ["node", "dist/index.js"]
