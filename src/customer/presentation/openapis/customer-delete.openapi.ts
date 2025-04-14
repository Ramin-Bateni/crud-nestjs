import { DeleteCustomerResponseDto } from '../dto/delete-customer.dto';

export const CustomerDeleteInformation = {
  summary: 'Delete customer',
  description: 'Delete a customer by ID',
};

export const CustomerDeleteSuccessResponse = {
  status: 200,
  description: 'Customer deleted successfully',
  type: DeleteCustomerResponseDto,
};

export const CustomerDeleteNotFoundResponse = {
  status: 404,
  description: 'Customer not found',
};

export const CustomerDeleteBadRequestResponse = {
  status: 400,
  description: 'Invalid customer ID',
}; 