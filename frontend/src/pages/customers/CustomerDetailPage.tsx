import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCustomer, useDeleteCustomer, useUpdateCustomer } from '../../hooks/customers/useCustomers';
import Card, { CardHeader, CardBody, CardFooter } from '../../components/common/Card';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import CustomerForm from '../../components/customers/CustomerForm';
import { Edit, Trash2, ArrowLeft, Mail, Phone, Calendar, CreditCard } from 'lucide-react';
import { UpdateCustomerDto } from '../../types/customer.types';

const CustomerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const { 
    data: customer, 
    isLoading,
    isError,
    error
  } = useCustomer(id || '');

  const updateCustomerMutation = useUpdateCustomer(id || '');
  const deleteCustomerMutation = useDeleteCustomer();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdateSubmit = (data: UpdateCustomerDto) => {
    updateCustomerMutation.mutate(data, {
      onSuccess: () => {
        setIsEditing(false);
      }
    });
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      deleteCustomerMutation.mutate(id || '', {
        onSuccess: () => {
          navigate('/customers');
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError || !customer) {
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
        
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Customer Not Found</h1>
          <p className="text-gray-600 mb-6">
            The customer you're looking for doesn't exist or was deleted.
          </p>
          <Button onClick={() => navigate('/customers')}>
            View All Customers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Button 
          variant="outline" 
          leftIcon={<ArrowLeft size={16} />}
          onClick={() => navigate('/customers')}
        >
          Back to Customers
        </Button>
        
        <div className="flex space-x-3">
          {!isEditing && (
            <>
              <Button 
                variant="primary" 
                leftIcon={<Edit size={16} />}
                onClick={handleEditClick}
              >
                Edit
              </Button>
              <Button 
                variant="danger" 
                leftIcon={<Trash2 size={16} />}
                onClick={handleDeleteClick}
                isLoading={deleteCustomerMutation.isPending}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      <Card>
        {isEditing ? (
          <>
            <CardHeader>
              <h1 className="text-xl font-semibold text-gray-800">Edit Customer</h1>
            </CardHeader>
            <CardBody>
              <CustomerForm 
                customer={customer} 
                onSubmit={handleUpdateSubmit} 
                isLoading={updateCustomerMutation.isPending}
                isEdit
              />
            </CardBody>
            <CardFooter className="flex justify-end">
              <Button 
                variant="outline" 
                onClick={handleCancelEdit}
                className="mr-3"
              >
                Cancel
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-lg mr-4">
                  {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {customer.firstName} {customer.lastName}
                  </h1>
                  <p className="text-gray-500">Customer ID: {customer.id}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-800">{customer.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-gray-800">{customer.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="text-gray-800">
                          {new Date(customer.dateOfBirth).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CreditCard className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Bank Account</p>
                        <p className="text-gray-800">
                          {customer.bankAccountNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </>
        )}
      </Card>
    </div>
  );
};

export default CustomerDetailPage;