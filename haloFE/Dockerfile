# Use a stable node base
FROM node:18-alpine

# Set environment for safer pnpm use
ENV PNPM_HOME=/tmp/.pnpm-store

# Create a dedicated app directory
RUN mkdir -p /app && chown -R node:node /app

# Set working directory
WORKDIR /app

# Switch to root just to install pnpm globally
USER root

# Install pnpm globally
RUN npm install -g pnpm

# Switch to node user
USER node

# Copy only package files first (to leverage Docker cache)
COPY --chown=node:node package.json pnpm-lock.yaml ./

# Install dependencies with safer config
RUN pnpm install --frozen-lockfile --shamefully-hoist

# Now copy rest of the app
COPY --chown=node:node . .

# Build the project
RUN pnpm build

# Expose port
EXPOSE 3000

# Start app
CMD ["pnpm", "start"]
