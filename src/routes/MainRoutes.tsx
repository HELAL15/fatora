import { Route } from 'react-router';
import Layout from '../layout/Layout';
import {
  AddBranch,
  AddZakat,
  BankAccounts,
  BankCards,
  BankCardTypes,
  Banks,
  Branch,
  Branches,
  CompanyProfile,
  Congratulatory,
  Decimal,
  Employees,
  Home,
  Invoice,
  SystemSettings,
  TaxPolicy,
  UpdateBranch,
  ZakatInvoice,
} from '../pages';

const MainRoutes = () => {
  return (
    <>
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
    </>
  );
};

export default MainRoutes;
