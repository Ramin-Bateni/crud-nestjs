import React from 'react';
import { Customer } from '../../types/customer.types';
import Card, { CardBody } from '../common/Card';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Calendar } from 'lucide-react';

interface CustomerCardProps {
  customer: Customer;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/customers/${customer.id}`);
  };

  return (
    <Card 
      className="h-full hover:translate-y-[-2px] transition-all"
      onClick={handleCardClick}
    >
      <CardBody>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">
            {customer.firstName} {customer.lastName}
          </h3>
          <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
            {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-gray-500">
            <Mail size={16} className="mr-2" />
            <span className="text-sm truncate">{customer.email}</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <Phone size={16} className="mr-2" />
            <span className="text-sm">{customer.phoneNumber}</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <Calendar size={16} className="mr-2" />
            <span className="text-sm">
              {new Date(customer.dateOfBirth).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CustomerCard;