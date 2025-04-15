import { GetCustomersResponseDto } from '../dto/get-customers.dto';

export const CustomerListInformation = {
  summary: 'Get paginated list of customers',
  description: 'Returns a paginated list of customers with metadata',
};

export const CustomerListSuccessResponse = {
  status: 200,
  description: 'Successfully retrieved customers list',
  type: GetCustomersResponseDto,
};

export const CustomerListBadRequestResponse = {
  status: 400,
  description: 'Bad request',
}; 