```
 ██████ ██████  ██    ██ ██████      ████████ ███████ ███████ ████████     ███    ██ ███████ ███████ ████████      ██ ███████ 
██      ██   ██ ██    ██ ██   ██        ██    ██      ██         ██        ████   ██ ██      ██         ██         ██ ██      
██      ██████  ██    ██ ██   ██        ██    █████   ███████    ██        ██ ██  ██ █████   ███████    ██         ██ ███████ 
██      ██   ██ ██    ██ ██   ██        ██    ██           ██    ██        ██  ██ ██ ██           ██    ██    ██   ██      ██ 
 ██████ ██   ██  ██████  ██████         ██    ███████ ███████    ██        ██   ████ ███████ ███████    ██     █████  ███████ 
      
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
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is a CRUD (Create, Read, Update, Delete) test application built with NestJS framework. The project follows a clean architecture approach with separate layers for domain, application, infrastructure, and presentation concerns.

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

## Project Structure

The project is organized using a clean architecture pattern with the following structure:

```
src/
├── customer/
│   ├── domain/         # Business entities and rules
│   │   ├── models/
│   │   │   └── entities/
│   │   │       └── customer.entity.ts
│   │   ├── application/    # Use cases and business logic
│   │   ├── infrastructure/ # Database implementations, repositories
│   │   │   └── module/
│   │   │       └── customer.module.ts
│   │   └── presentation/   # Controllers, DTOs, and API endpoints
├── common/
│   └── schema/
│       └── base.schema.ts
├── app.module.ts       # Root module configuration
└── main.ts            # Application entry point
```

## Features

- Customer management system with CRUD operations
- Clean architecture implementation
- TypeScript-based development
- Modular and maintainable code structure
- MongoDB integration with environment-based configuration
- Base schema implementation for common fields
- Phone number validation using Google's libphonenumber
- Input validation using class-validator
- Swagger API documentation

## Customer Entity

The application includes a Customer entity with the following fields:

```typescript
export class Customer extends BaseSchema {
  @Prop({ type: String, required: true, maxlength: 50 })
  @ApiProperty({ type: String, required: true, maxLength: 50 })
  firstName: string;

  @Prop({ type: String, required: true, maxlength: 50 })
  @ApiProperty({ type: String, required: true, maxLength: 50 })
  lastName: string;

  @Prop({ type: Date, required: true })
  @ApiProperty({ type: Date, required: true })
  dateOfBirth: Date;

  @Prop({ type: String, required: true, match: /^\d+$/, maxlength: 15 })
  @ApiProperty({ type: String, required: true, maxLength: 15 })
  @IsValidPhoneNumber()
  phoneNumber: string;

  @Prop({ type: String, required: true, unique: true, maxlength: 100 })
  @ApiProperty({ type: String, required: true, maxLength: 100 })
  @IsValidEmail()
  email: string;

  @Prop({ type: String, required: true, maxlength: 34 })
  @ApiProperty({ type: String, required: true, maxLength: 34 })
  @IsValidBankAccount()
  bankAccountNumber: string;
}
```

### Field Character Limits

The Customer entity enforces the following character limits for string fields:

- First Name: Maximum 50 characters
- Last Name: Maximum 50 characters
- Phone Number: Maximum 15 digits (stored as digits only)
- Email: Maximum 100 characters
- Bank Account Number: Maximum 34 characters (IBAN standard length)

These limits are enforced both at the database level and through API validation.

### Unique Constraints

The Customer entity has the following unique constraints:
- Email address must be unique (enforced at the database level)
- The combination of First Name, Last Name, and Date of Birth must be unique (no duplicate customers with the same name and birth date)

### Phone Number Validation

The application includes a custom validator for phone numbers using Google's libphonenumber library. The validator:

- Ensures the phone number is in a valid format
- Verifies that the number is a mobile number (not a landline)
- Supports international phone number formats
- Returns clear error messages for invalid numbers
- Stores phone numbers in an optimized format (digits only) to minimize storage space

Example of valid mobile numbers (stored as digits only):
- +1 650-253-0000 → 16502530000
- +44 7911 123456 → 447911123456
- +98 912 123 4567 → 989121234567

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- MongoDB (v4.4 or higher)
- Docker and Docker Compose (for containerized deployment)

## Docker Setup

The project includes Docker configuration for easy deployment and development. The setup includes:

- MongoDB container
- NestJS application container
- Persistent volume for MongoDB data
- Custom network for service communication

### Docker Configuration Files

1. `docker-compose.yml`: Defines the services, networks, and volumes
2. `Dockerfile`: Builds the NestJS application image

### Running with Docker

To start the application using Docker:

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

### Environment Variables in Docker

The Docker setup uses the following environment variables:
```env
MONGODB_URI=mongodb://mongodb:27017/nestjs_db
NODE_ENV=development
PORT=3000
```

Note: The MongoDB URI in Docker points to the MongoDB service name (`mongodb`) instead of `localhost`.

## Environment Variables

The application uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

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
```

Make sure to:
- Never commit the `.env` file to version control
- Use different values for different environments (development, staging, production)
- Keep sensitive information secure
- Update the MongoDB URI with your actual MongoDB connection string

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

1. Copy the sample environment file:
```bash
$ cp sample.env .env
```

2. Update the `.env` file with your specific configuration:
   - For local development, you can use the default values
   - For production, update the MongoDB credentials and other sensitive information
   - Make sure to never commit the `.env` file to version control

3. The `sample.env` file contains all the necessary environment variables with example values:
   - Server configuration (PORT, NODE_ENV)
   - MongoDB configuration (URI, credentials, database name)
   - Swagger documentation settings

4. For Docker deployment, the environment variables are automatically configured in the `docker-compose.yml` file.

## Running the application

```bash
# Development mode
$ npm run start:dev

# Production mode
$ npm run start:prod

# Using Docker
$ docker-compose up --build
```

## Test

```bash
# Unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Development

This project uses:
- NestJS v11
- TypeScript
- Jest for testing
- ESLint and Prettier for code formatting
- @typegoose/typegoose for MongoDB schema definitions
- @nestjs/swagger for API documentation

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

This project is [MIT licensed](LICENSE).
