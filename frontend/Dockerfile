FROM node:20-alpine

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

RUN chown -R nodejs:nodejs /app

COPY --chown=nodejs:nodejs package*.json ./

USER nodejs

RUN npm install

COPY --chown=nodejs:nodejs . .

EXPOSE 5173

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5173/health || exit 1

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--open", "false"]
