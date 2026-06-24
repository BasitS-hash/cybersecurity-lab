# WARNING: This image runs an INTENTIONALLY VULNERABLE application for educational use only.
# Do NOT deploy this image to production or public-facing environments.

FROM node:18-alpine

# hadolint ignore=DL3018
RUN apk add --no-cache dumb-init

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production --ignore-scripts

# Copy application code (app_fixed.js excluded from runtime image)
COPY app.js ./

EXPOSE 4000

USER node

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "app.js"]
