# Use a stable node base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Switch to root to install dependencies
USER root

# Copy necessary files and install dependencies using yarn
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install

# Now copy rest of the app
COPY --chown=node:node . .

# Run the app using yarn (use yarn dev for development)
CMD ["yarn", "dev"]

# Expose port for backend
EXPOSE 3001
