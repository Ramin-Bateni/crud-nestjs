import React from 'react';
import { useForm } from 'react-hook-form';
import { Customer, CreateCustomerDto, UpdateCustomerDto } from '../../types/customer.types';
import Button from '../common/Button';
import Input from '../common/Input';
import { Mail, Phone, User, Calendar, CreditCard } from 'lucide-react';

interface CustomerFormProps {
  customer?: Customer;
  onSubmit: (data: CreateCustomerDto | UpdateCustomerDto) => void;
  isLoading?: boolean;
  isEdit?: boolean;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  customer,
  onSubmit,
  isLoading = false,
  isEdit = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCustomerDto>({
    defaultValues: customer || {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      bankAccountNumber: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          id="firstName"
          placeholder="John"
          leftIcon={<User size={18} />}
          error={errors.firstName?.message}
          {...register('firstName', { required: 'First name is required' })}
        />
        
        <Input
          label="Last Name"
          id="lastName"
          placeholder="Doe"
          leftIcon={<User size={18} />}
          error={errors.lastName?.message}
          {...register('lastName', { required: 'Last name is required' })}
        />
      </div>

      <Input
        label="Email"
        id="email"
        type="email"
        placeholder="john.doe@example.com"
        leftIcon={<Mail size={18} />}
        error={errors.email?.message}
        {...register('email', { 
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Phone Number"
          id="phoneNumber"
          placeholder="+1234567890"
          leftIcon={<Phone size={18} />}
          error={errors.phoneNumber?.message}
          {...register('phoneNumber', { required: 'Phone number is required' })}
        />
        
        <Input
          label="Date of Birth"
          id="dateOfBirth"
          type="date"
          leftIcon={<Calendar size={18} />}
          error={errors.dateOfBirth?.message}
          {...register('dateOfBirth', { required: 'Date of birth is required' })}
        />
      </div>

      <Input
        label="Bank Account Number"
        id="bankAccountNumber"
        placeholder="123456789012"
        leftIcon={<CreditCard size={18} />}
        error={errors.bankAccountNumber?.message}
        {...register('bankAccountNumber', { required: 'Bank account number is required' })}
      />

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="submit"
          isLoading={isLoading}
          variant="primary"
        >
          {isEdit ? 'Update Customer' : 'Create Customer'}
        </Button>
      </div>
    </form>
  );
};

export default CustomerForm;