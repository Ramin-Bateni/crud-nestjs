# Backend Development Assignment

## Candidate Information

- Name: Mansour Farabi
- Email: mansour.farabi@gmail.com
- Phone: +989127978663

## Project Overview

This project implements a CRUD application using:

- Clean Architecture
- Domain-Driven Design (DDD)
- Test-Driven Development (TDD)
- Behavior-Driven Development (BDD)
- Command Query Responsibility Segregation (CQRS)

## Project Setup

```bash
# Install dependencies
$ npm install

# Start Docker containers
$ npm run docker:up

# Start the application
$ npm start
```

## Docker Setup

The project uses Docker Compose to manage the application and database services:

```bash
# Build and start all services
$ npm run docker:up

# Stop all services
$ npm run docker:down

# Rebuild containers
$ npm run docker:build

# View container logs
$ npm run docker:logs
```

### Environment Configuration

The application uses the following environment variables:

- `DATABASE_HOST`: Database host (default: db)
- `DATABASE_PORT`: Database port (default: 5432)
- `DATABASE_USERNAME`: Database username (default: postgres)
- `DATABASE_PASSWORD`: Database password (default: postgres)
- `DATABASE_NAME`: Database name (default: postgres)

## API Documentation

Swagger documentation is available at `/api` endpoint.

## Testing

```bash
# Run unit tests
$ npm run test

# Run e2e tests
$ npm run test:e2e
```

## Development

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test Coverage

```bash
$ npm run test:cov
```

## Support

For any questions or issues, please contact the candidate at mansour.farabi@gmail.com
