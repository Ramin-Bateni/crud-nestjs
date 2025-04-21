import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customersApi } from "../../http/apis/customers/customers.api";
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from "../../types/customer.types";
import { toast } from "react-toastify";


export const customerKeys = {
  all: ["customers"] as const,
  lists: () => [...customerKeys.all, "list"] as const,
  list: (filters: string) => [...customerKeys.lists(), { filters }] as const,
  details: () => [...customerKeys.all, "detail"] as const,
  detail: (id: string) => [...customerKeys.details(), id] as const,
};

export const useCustomers = () => {
  return useQuery({
    queryKey: customerKeys.lists(),
    queryFn: () => customersApi.getAllCustomers(),
  });
};

export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: () => customersApi.getCustomerById(id),
    enabled: !!id,
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCustomer: CreateCustomerDto) =>
      customersApi.createCustomer(newCustomer),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
      toast.success("Customer created successfully");
      return data;
    },
    onError: (error: any) => {
      toast.error(
        `Failed to create customer: ${error.response?.data.message.join(", ")}`
      );
      return error;
    },
  });
};

export const useUpdateCustomer = (id: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (customerData: UpdateCustomerDto) => {
      const { id: _, ...updateData } = customerData as any;
      return customersApi.updateCustomer(id, updateData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: customerKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
      toast.success('Customer updated successfully');
      return data;
    },
    onError: (error) => {
      toast.error('Failed to update customer');
      return error;
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => customersApi.deleteCustomer(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
      queryClient.removeQueries({ queryKey: customerKeys.detail(variables) });
      toast.success("Customer deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        `Failed to delete customer: ${error.response?.data.message.join(", ")}`
      );
      return error;
    },
  });
};
