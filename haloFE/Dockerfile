# Use Node.js 20.x (ensure the correct version is used)
FROM node:20.16.0-alpine

# Set environment for safer pnpm use
ENV PNPM_HOME=/tmp/.pnpm-store

# Create a dedicated app directory
RUN mkdir -p /app && chown -R node:node /app

# Set working directory
WORKDIR /app

# Switch to root to install pnpm globally
USER root

# Install pnpm with specific directory for global packages
RUN npm config set prefix /usr/local && npm install -g pnpm --unsafe-perm

# Switch back to node user
USER node

# Copy necessary files and install dependencies using pnpm
COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --shamefully-hoist

# Now copy rest of the app
COPY --chown=node:node . .

# Run the app using pnpm (use pnpm dev for development)
CMD ["pnpm", "dev"]

# Expose port for frontend
EXPOSE 3000
