import { Route, Routes } from 'react-router';
import { LoginDashboard, NotFound } from '../pages';
import MainRoutes from './MainRoutes';
import BranchRoutes from './BranchRoutes';

const AppRoutes = () => {
  const mainRoutes = MainRoutes();
  const branchRoutes = BranchRoutes();

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginDashboard />} />

        {/* super admin routes  */}
        {mainRoutes}

        {/* branch routes  */}
        {branchRoutes}

        {/* ** not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
