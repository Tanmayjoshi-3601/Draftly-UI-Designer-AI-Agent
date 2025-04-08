# Docker Setup for UI/UX Design Generator

To containerize this application, follow these steps:

## 1. Create a Dockerfile

Create a file named `Dockerfile` with the following content:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application if needed
RUN npm run build || echo "No build script found, skipping build step"

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start"]
```

## 2. Create a docker-compose.yml file

Create a file named `docker-compose.yml` with the following content:

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "5000:5000"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgresql://${PGUSER}:${PGPASSWORD}@db:5432/${PGDATABASE}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    volumes:
      - .:/app
      - /app/node_modules

  db:
    image: postgres:15
    restart: always
    environment:
      - POSTGRES_USER=${PGUSER}
      - POSTGRES_PASSWORD=${PGPASSWORD}
      - POSTGRES_DB=${PGDATABASE}
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

## 3. Create a .env file

Create a file named `.env` with the following content:

```
# Database configuration
PGUSER=postgres
PGPASSWORD=securepassword
PGDATABASE=designs
PGHOST=db
PGPORT=5432
DATABASE_URL=postgresql://postgres:securepassword@db:5432/designs

# OpenAI API key
OPENAI_API_KEY=your_openai_api_key_here
```

**Important:** Replace `your_openai_api_key_here` with your actual OpenAI API key.

## 4. Add a start script to package.json

Make sure your `package.json` has a start script. You should add the following:

```json
"scripts": {
  "start": "node server/index.js",
  ...other scripts...
}
```

## 5. Create a .gitignore file for Docker

Add a `.dockerignore` file with the following content:

```
node_modules
npm-debug.log
.env
```

## 6. Running the Application

Once all these files are in place, run the application with Docker Compose:

```bash
docker-compose up --build
```

This will:
1. Build the Docker image for your application
2. Start a PostgreSQL database container
3. Start your application container
4. Connect your application to the database

## 7. Accessing the Application

Once running, you can access the application at:

http://localhost:5000

## Additional Notes

- For production deployment, consider using a more robust database backup strategy
- You may want to configure proper health checks for container orchestration
- For a multi-environment setup, consider using different docker-compose files for development, staging, and production