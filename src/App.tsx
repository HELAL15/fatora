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
  Decimal
} from './pages';
import Layout from './components/layouts/Layout';

function App() {
  return (
    <>
      <Routes>
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
          {/* invoice settings page  */}
          <Route path="/system/invoice-data" element={<Invoice />} />
          <Route path="/system/decimal-number" element={<Decimal />} />
          <Route path="/system/congratulatory" element={<Congratulatory />} />
          {/* ** not found page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
