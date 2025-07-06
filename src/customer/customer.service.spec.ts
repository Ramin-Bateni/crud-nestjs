import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './customer.entity';

describe('CustomerService', () => {
  let service: CustomerService;
  //   let repository: CustomerRepository;

  const mockCustomer: Customer = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    bankAccountNumber: '7364734524564567',
    dateOfBirth: new Date('1999-03-11'),
    phoneNumber: '+989149898115',
    // add other Customer entity properties if exist
  };

  const mockCustomerRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        { provide: CustomerRepository, useValue: mockCustomerRepository },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    // repository = module.get<CustomerRepository>(CustomerRepository);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and return a customer', async () => {
      const dto: CreateCustomerDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        bankAccountNumber: '7364734524564567',
        dateOfBirth: '1999-03-11',
        phoneNumber: '+989149898115',
      };
      mockCustomerRepository.create.mockResolvedValue(mockCustomer);

      const result = await service.create(dto);

      expect(mockCustomerRepository.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockCustomer);
    });
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      mockCustomerRepository.findAll.mockResolvedValue([mockCustomer]);

      const result = await service.findAll();

      expect(mockCustomerRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockCustomer]);
    });
  });

  describe('findOne', () => {
    it('should return a customer if found', async () => {
      mockCustomerRepository.findOne.mockResolvedValue(mockCustomer);

      const result = await service.findOne('1');

      expect(mockCustomerRepository.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockCustomer);
    });

    it('should throw NotFoundException if customer not found', async () => {
      mockCustomerRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
      expect(mockCustomerRepository.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update and return the customer if found', async () => {
      const updateDto: UpdateCustomerDto = { firstName: 'Jane' };
      mockCustomerRepository.findOne.mockResolvedValue(mockCustomer);
      mockCustomerRepository.update.mockResolvedValue({
        ...mockCustomer,
        ...updateDto,
      });

      const result = await service.update('1', updateDto);

      expect(mockCustomerRepository.findOne).toHaveBeenCalledWith('1');
      expect(mockCustomerRepository.update).toHaveBeenCalledWith(
        '1',
        updateDto,
      );
      expect(result).toEqual({ ...mockCustomer, ...updateDto });
    });

    it('should throw NotFoundException if customer to update not found', async () => {
      mockCustomerRepository.findOne.mockResolvedValue(null);

      await expect(service.update('1', { firstName: 'Jane' })).rejects.toThrow(
        NotFoundException,
      );
      expect(mockCustomerRepository.findOne).toHaveBeenCalledWith('1');
      expect(mockCustomerRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove the customer if found', async () => {
      mockCustomerRepository.findOne.mockResolvedValue(mockCustomer);
      mockCustomerRepository.remove.mockResolvedValue(undefined);

      await service.remove('1');

      expect(mockCustomerRepository.findOne).toHaveBeenCalledWith('1');
      expect(mockCustomerRepository.remove).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if customer to remove not found', async () => {
      mockCustomerRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
      expect(mockCustomerRepository.findOne).toHaveBeenCalledWith('1');
      expect(mockCustomerRepository.remove).not.toHaveBeenCalled();
    });
  });
});
