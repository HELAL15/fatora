import { Route, Routes } from 'react-router';
import {
  Home,
  NotFound,
  SystemSettings,
  CompanyProfile,
  Employees,
  Branches,
  BankCards,
  BankCardTypes,
  BankAccounts,
  Banks,
  TaxPolicy,
  ZakatInvoice,
  Congratulatory,
  Invoice,
  Decimal,
  LoginDashboard,
  AddZakat,
  BranchHome,
  SellingInvoices,
  AddSellingInvoice,
  ReturningInvoice,
  AddReturningInvoice,
  Branch,
  AddBranch,
  UpdateBranch
} from './pages';
import Layout from './components/layouts/Layout';
import BranchLayout from './components/layouts/BranchLayout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginDashboard />} />
        <Route element={<Layout />}>
          {/* home page  */}
          <Route index element={<Home />} />
          {/* system settings  */}
          <Route path="/system">
            <Route index element={<SystemSettings />} />
            {/* company structure pages  */}
            <Route path="company-profile" element={<CompanyProfile />} />
            <Route path="employees" element={<Employees />} />
            {/* branches structure pages */}
            <Route path="branches">
              <Route index element={<Branches />} />
              <Route path="add" element={<AddBranch />} />
              <Route path=":branchId">
                <Route index element={<Branch />} />
                <Route path="update" element={<UpdateBranch />} />
              </Route>
            </Route>

            {/* bank settings pages  */}
            <Route path="banks" element={<Banks />} />
            <Route path="bank-accounts" element={<BankAccounts />} />
            <Route path="bank-card-types" element={<BankCardTypes />} />
            <Route path="bank-cards" element={<BankCards />} />
            {/* sales settings page  */}
            <Route path="tax-policy" element={<TaxPolicy />} />
            <Route path="zakat-income" element={<ZakatInvoice />} />
            <Route path="zakat-income/add" element={<AddZakat />} />
            {/* invoice settings page  */}
            <Route path="invoice-data" element={<Invoice />} />
            <Route path="decimal-number" element={<Decimal />} />
            <Route path="congratulatory" element={<Congratulatory />} />
          </Route>
        </Route>
        <Route path="/branch" element={<BranchLayout />}>
          <Route index element={<BranchHome />} />
          <Route path="selling-invoices" element={<SellingInvoices />} />
          <Route path="selling-invoices/add" element={<AddSellingInvoice />} />
          <Route path="return-invoices" element={<ReturningInvoice />} />
          <Route path="return-invoices/add" element={<AddReturningInvoice />} />
        </Route>
        {/* ** not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
