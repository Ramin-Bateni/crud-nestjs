import { apiService } from "../../client/axios-client";
import {
  Customer,
  CreateCustomerDto,
  UpdateCustomerDto,
} from "../../../types/customer.types";

const CUSTOMERS_ENDPOINT = "/customers";

export const customersApi = {
  getAllCustomers: (): Promise<Customer[]> => {
    return apiService.get<Customer[]>(CUSTOMERS_ENDPOINT);
  },

  getCustomerById: (id: string): Promise<Customer> => {
    return apiService.get<Customer>(`${CUSTOMERS_ENDPOINT}/${id}`);
  },

  createCustomer: (customerData: CreateCustomerDto): Promise<Customer> => {
    return apiService.post<Customer, CreateCustomerDto>(
      CUSTOMERS_ENDPOINT,
      customerData
    );
  },

  updateCustomer: (
    id: string,
    customerData: UpdateCustomerDto
  ): Promise<Customer> => {
    return apiService.put<Customer, UpdateCustomerDto>(
      `${CUSTOMERS_ENDPOINT}/${id}`,
      customerData
    );
  },

  deleteCustomer: (id: string): Promise<void> => {
    return apiService.delete<void>(`${CUSTOMERS_ENDPOINT}/${id}`);
  },
};
