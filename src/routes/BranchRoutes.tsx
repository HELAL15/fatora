import { Route } from 'react-router';
import BranchLayout from '../layout/BranchLayout';
import {
  AddReturningInvoice,
  AddSellingInvoice,
  BranchHome,
  ReturningInvoice,
  SellingInvoices,
} from '../pages';

const BranchRoutes = () => {
  return (
    <>
      <Route path="/branch" element={<BranchLayout />}>
        <Route index element={<BranchHome />} />
        <Route path="selling-invoices" element={<SellingInvoices />} />
        <Route path="selling-invoices/add" element={<AddSellingInvoice />} />
        <Route path="return-invoices" element={<ReturningInvoice />} />
        <Route path="return-invoices/add" element={<AddReturningInvoice />} />
      </Route>
    </>
  );
};

export default BranchRoutes;
