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
  AddReturningInvoice
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
          <Route path="/system" element={<SystemSettings />} />
          {/* company structure pages  */}
          <Route path="/system/company-profile" element={<CompanyProfile />} />
          <Route path="/system/employees" element={<Employees />} />
          <Route path="/system/branches" element={<Branches />} />
          {/* bank settings pages  */}
          <Route path="/system/banks" element={<Banks />} />
          <Route path="/system/bank-accounts" element={<BankAccounts />} />
          <Route path="/system/bank-card-types" element={<BankCardTypes />} />
          <Route path="/system/bank-cards" element={<BankCards />} />
          {/* sales settings page  */}
          <Route path="/system/tax-policy" element={<TaxPolicy />} />
          <Route path="/system/zakat-income" element={<ZakatInvoice />} />
          <Route path="/system/zakat-income/add" element={<AddZakat />} />
          {/* invoice settings page  */}
          <Route path="/system/invoice-data" element={<Invoice />} />
          <Route path="/system/decimal-number" element={<Decimal />} />
          <Route path="/system/congratulatory" element={<Congratulatory />} />
        </Route>
        <Route element={<BranchLayout />}>
          <Route path="/branch" element={<BranchHome />} />
          <Route
            path="/branch/selling-invoices"
            element={<SellingInvoices />}
          />
          <Route
            path="/branch/selling-invoices/add"
            element={<AddSellingInvoice />}
          />

          <Route
            path="/branch/return-invoices"
            element={<ReturningInvoice />}
          />
          <Route
            path="/branch/return-invoices/add"
            element={<AddReturningInvoice />}
          />
        </Route>
        {/* ** not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
