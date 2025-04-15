```
  ▗▖  ▗▖▗▄▄▄▖ ▗▄▄▖▗▄▄▄▖ ▗▖ ▗▄▄▖     ▗▄▄▖▗▄▄▖ ▗▖ ▗▖▗▄▄▄      ▗▄▖ ▗▄▄▖▗▄▄▄▖
  ▐▛▚▖▐▌▐▌   ▐▌     █   ▐▌▐▌       ▐▌   ▐▌ ▐▌▐▌ ▐▌▐▌  █    ▐▌ ▐▌▐▌ ▐▌ █  
  ▐▌ ▝▜▌▐▛▀▀▘ ▝▀▚▖  █   ▐▌ ▝▀▚▖    ▐▌   ▐▛▀▚▖▐▌ ▐▌▐▌  █    ▐▛▀▜▌▐▛▀▘  █  
  ▐▌  ▐▌▐▙▄▄▖▗▄▄▞▘  █▗▄▄▞▘▗▄▄▞▘    ▝▚▄▄▖▐▌ ▐▌▝▚▄▞▘▐▙▄▄▀    ▐▌ ▐▌▐▌  ▗▄█▄▖  
```

# CRUD Test NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## Description

This is a CRUD (Create, Read, Update, Delete) test application built with NestJS framework. The project follows a clean architecture approach with separate layers for domain, application, infrastructure, and presentation concerns. It includes features like internationalization (i18n), pagination, validation, and comprehensive API documentation.

## Features

- Clean Architecture implementation with clear separation of concerns
- Customer management system with CRUD operations
- Internationalization (i18n) support
- Pagination for list endpoints
- Comprehensive input validation
- Swagger API documentation
- MongoDB integration with environment-based configuration
- Docker support for easy deployment
- TypeScript-based development
- Modular and maintainable code structure

## Project Structure

The project is organized using a clean architecture pattern with the following structure:

```
src/
├── customer/                    # Customer module
│   ├── domain/                 # Business entities and rules
│   │   ├── models/
│   │   │   └── entities/
│   │   ├── application/        # Use cases and business logic
│   │   ├── infrastructure/     # Database implementations, repositories
│   │   └── presentation/       # Controllers, DTOs, and API endpoints
├── common/                     # Shared components
│   ├── config/                # Configuration management
│   ├── dto/                   # Data Transfer Objects
│   ├── enum/                  # Enumerations
│   ├── factories/             # Factory patterns
│   ├── helper/                # Helper functions
│   ├── interfaces/            # TypeScript interfaces
│   ├── openapi/               # OpenAPI/Swagger decorators
│   ├── pagination/            # Pagination utilities
│   ├── repositories/          # Base repository implementations
│   ├── schema/                # Base schemas
│   ├── test/                  # Test utilities
│   ├── type/                  # Type definitions
│   ├── util/                  # Utility functions
│   └── validators/            # Custom validators
├── i18n/                      # Internationalization
│   └── localization/          # Translation files
├── app.module.ts              # Root module configuration
└── main.ts                    # Application entry point
```

## API Documentation

The API documentation is available through Swagger UI. Once the application is running, you can access the documentation at:

```
http://localhost:3000/api/docs
```

The Swagger documentation provides:
- Interactive API documentation
- Request/response schemas
- Authentication information
- API endpoints testing interface

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- MongoDB (v4.4 or higher)
- Docker and Docker Compose (for containerized deployment)

## Installation

```bash
# Clone the repository
$ git clone [repository-url]

# Install dependencies
$ npm install

# OR using Docker
$ docker-compose up --build
```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/nestjs_db
MONGODB_USERNAME=
MONGODB_PASSWORD=
DATABASE_NAME=nestjs_db

# Swagger Configuration
SWAGGER_TITLE=NestJS CRUD API
SWAGGER_DESCRIPTION=The NestJS CRUD API documentation
SWAGGER_VERSION=1.0
SWAGGER_PATH=api

# Internationalization
DEFAULT_LANGUAGE=en
FALLBACK_LANGUAGE=en
```

## Docker Setup

The project includes Docker configuration for easy deployment and development. The setup includes:

- MongoDB container
- NestJS application container
- Persistent volume for MongoDB data
- Custom network for service communication

### Running with Docker

```bash
# Build and start the containers
$ docker-compose up --build

# To run in detached mode
$ docker-compose up -d --build

# To stop the containers
$ docker-compose down

# To view logs
$ docker-compose logs -f
```

The services will be available at:
- NestJS application: http://localhost:3000
- Swagger documentation: http://localhost:3000/api
- MongoDB: mongodb://localhost:27017

## Development

```bash
# Start the application in development mode
$ npm run start:dev

# Build the application
$ npm run build

# Start the application in production mode
$ npm run start:prod

# Run tests
$ npm run test
$ npm run test:e2e
$ npm run test:cov
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
