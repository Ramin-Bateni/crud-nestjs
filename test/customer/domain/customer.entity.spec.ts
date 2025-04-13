import { Customer } from '../../../src/customer/domain/models/entities/customer.entity';
import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../src/app.module';

describe('Customer Entity', () => {
  let app;
  let validationPipe: ValidationPipe;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    app.useGlobalPipes(validationPipe);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Validation', () => {
    it('should create a valid customer', async () => {
      const customerData = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date('1990-01-01'),
        phoneNumber: '1234567890',
        email: 'john.doe@example.com',
        bankAccountNumber: 'DE89370400440532013000',
      };

      const customer = new Customer(customerData);
      expect(customer).toBeDefined();
      expect(customer.firstName).toBe(customerData.firstName);
      expect(customer.lastName).toBe(customerData.lastName);
      expect(customer.dateOfBirth).toEqual(customerData.dateOfBirth);
      expect(customer.phoneNumber).toBe(customerData.phoneNumber);
      expect(customer.email).toBe(customerData.email);
      expect(customer.bankAccountNumber).toBe(customerData.bankAccountNumber);
    });

    it('should fail validation with invalid email', async () => {
      const customerData = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date('1990-01-01'),
        phoneNumber: '1234567890',
        email: 'invalid-email',
        bankAccountNumber: 'DE89370400440532013000',
      };

      const customer = new Customer(customerData);
      await expect(validationPipe.transform(customer, { type: 'body' }))
        .rejects
        .toThrow();
    });

    it('should fail validation with invalid phone number', async () => {
      const customerData = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date('1990-01-01'),
        phoneNumber: 'invalid-phone',
        email: 'john.doe@example.com',
        bankAccountNumber: 'DE89370400440532013000',
      };

      const customer = new Customer(customerData);
      await expect(validationPipe.transform(customer, { type: 'body' }))
        .rejects
        .toThrow();
    });

    it('should fail validation with invalid bank account number', async () => {
      const customerData = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date('1990-01-01'),
        phoneNumber: '1234567890',
        email: 'john.doe@example.com',
        bankAccountNumber: 'invalid-iban',
      };

      const customer = new Customer(customerData);
      await expect(validationPipe.transform(customer, { type: 'body' }))
        .rejects
        .toThrow();
    });

    it('should fail validation with missing required fields', async () => {
      const customerData = {
        firstName: 'John',
        // Missing lastName
        dateOfBirth: new Date('1990-01-01'),
        phoneNumber: '1234567890',
        email: 'john.doe@example.com',
        bankAccountNumber: 'DE89370400440532013000',
      };

      const customer = new Customer(customerData);
      await expect(validationPipe.transform(customer, { type: 'body' }))
        .rejects
        .toThrow();
    });

    it('should fail validation with fields exceeding max length', async () => {
      const customerData = {
        firstName: 'A'.repeat(51), // Exceeds max length of 50
        lastName: 'Doe',
        dateOfBirth: new Date('1990-01-01'),
        phoneNumber: '1234567890',
        email: 'john.doe@example.com',
        bankAccountNumber: 'DE89370400440532013000',
      };

      const customer = new Customer(customerData);
      await expect(validationPipe.transform(customer, { type: 'body' }))
        .rejects
        .toThrow();
    });
  });
}); 