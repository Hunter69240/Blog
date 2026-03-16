FROM node:22-alpine
WORKDIR /app

# Copy package files and install ALL deps (need prisma CLI for generate + migrate)
COPY package*.json ./
RUN npm ci

# Copy prisma schema first and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy rest of the source code
COPY . .

EXPOSE 3000

# On startup: run migrations first, then start the app
CMD ["sh", "-c", "npx prisma migrate deploy && node index.js"]