import React, { useState } from 'react';
import { useCustomers, useCreateCustomer, useUpdateCustomer, useDeleteCustomer } from '../../hooks/customers/useCustomers';
import Button from '../../components/common/Button';
import Card, { CardHeader, CardBody } from '../../components/common/Card';
import CustomerForm from '../../components/customers/CustomerForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Plus, Search, Edit, Trash2, X } from 'lucide-react';
import { Customer, CreateCustomerDto, UpdateCustomerDto } from '../../types/customer.types';

const CustomersListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: customers, isLoading, isError, refetch } = useCustomers();
  const createCustomerMutation = useCreateCustomer();
  const updateCustomerMutation = useUpdateCustomer(selectedCustomer?.id || '');
  const deleteCustomerMutation = useDeleteCustomer();

  const filteredCustomers = customers?.filter(customer => {
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    return fullName.includes(searchLower) || 
           customer.email.toLowerCase().includes(searchLower) ||
           customer.phoneNumber.includes(searchLower);
  });

  const handleCreateClick = () => {
    setSelectedCustomer(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsFormOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      await deleteCustomerMutation.mutateAsync(id);
    }
  };

  const handleSubmit = async (data: CreateCustomerDto | UpdateCustomerDto) => {
    if (selectedCustomer) {
      await updateCustomerMutation.mutateAsync(data);
    } else {
      await createCustomerMutation.mutateAsync(data as CreateCustomerDto);
    }
    setIsFormOpen(false);
    setSelectedCustomer(null);
  };

  if (isError) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Error loading customers</h2>
        <p className="text-gray-600 mb-4">There was an error loading the customer data.</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Customers</h1>
        <Button leftIcon={<Plus size={16} />} onClick={handleCreateClick}>
          Add Customer
        </Button>
      </div>

      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search customers..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isFormOpen && (
        <div className="mb-6">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {selectedCustomer ? 'Edit Customer' : 'Add New Customer'}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFormOpen(false)}
                leftIcon={<X size={16} />}
              >
                Close
              </Button>
            </CardHeader>
            <CardBody>
              <CustomerForm
                customer={selectedCustomer}
                onSubmit={handleSubmit}
                isLoading={createCustomerMutation.isPending || updateCustomerMutation.isPending}
                isEdit={!!selectedCustomer}
              />
            </CardBody>
          </Card>
        </div>
      )}

      {isLoading ? (
        <div className="py-12">
          <LoadingSpinner size="lg" className="mx-auto" />
        </div>
      ) : filteredCustomers && filteredCustomers.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold mr-3">
                        {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{customer.firstName} {customer.lastName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(customer.dateOfBirth).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        leftIcon={<Edit size={14} />}
                        onClick={() => handleEditClick(customer)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        leftIcon={<Trash2 size={14} />}
                        onClick={() => handleDeleteClick(customer.id)}
                        isLoading={deleteCustomerMutation.isPending}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No customers found</h2>
          <p className="text-gray-500 mb-6">
            {searchTerm 
              ? "No customers match your search criteria." 
              : "You haven't added any customers yet."}
          </p>
          <Button onClick={handleCreateClick}>Add Your First Customer</Button>
        </div>
      )}
    </div>
  );
};

export default CustomersListPage;