import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import DashboardPage from '../pages/DashboardPage';
import CustomersListPage from '../pages/customers/CustomersListPage';
import CustomerDetailPage from '../pages/customers/CustomerDetailPage';
import CustomerCreatePage from '../pages/customers/CustomerCreatePage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="customers">
          <Route index element={<CustomersListPage />} />
          <Route path="new" element={<CustomerCreatePage />} />
          <Route path=":id" element={<CustomerDetailPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;