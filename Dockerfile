# Tahap 1: Builder
FROM node:22-alpine AS builder

# Install dependensi OS untuk mesin Prisma
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json* ./
RUN npm install

# Copy seluruh source code
COPY . .

# Generate Client Lino & Client E-Journal
RUN npx prisma generate
RUN npx prisma generate --schema=prisma/ejournal.prisma

# Build aplikasi Next.js
RUN npm run build

# Tahap 2: Production Runner
FROM node:22-alpine AS runner

RUN apk add --no-cache openssl libc6-compat

WORKDIR /app
ENV NODE_ENV=production

# Copy file hasil build dari tahap builder
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "start"]