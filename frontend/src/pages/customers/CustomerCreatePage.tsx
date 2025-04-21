import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateCustomer } from '../../hooks/customers/useCustomers';
import Card, { CardHeader, CardBody } from '../../components/common/Card';
import Button from '../../components/common/Button';
import CustomerForm from '../../components/customers/CustomerForm';
import { ArrowLeft } from 'lucide-react';
import { CreateCustomerDto } from '../../types/customer.types';

const CustomerCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const createCustomerMutation = useCreateCustomer();

  const handleSubmit = (data: CreateCustomerDto) => {
    createCustomerMutation.mutate(data, {
      onSuccess: (newCustomer) => {
        navigate(`/customers/${newCustomer.id}`);
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="outline" 
          leftIcon={<ArrowLeft size={16} />}
          onClick={() => navigate('/customers')}
        >
          Back to Customers
        </Button>
      </div>

      <Card>
        <CardHeader>
          <h1 className="text-xl font-semibold text-gray-800">Create New Customer</h1>
        </CardHeader>
        <CardBody>
          <CustomerForm 
            onSubmit={handleSubmit} 
            isLoading={createCustomerMutation.isPending}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default CustomerCreatePage;