import { Route, Routes } from 'react-router';
import { LoginDashboard, NotFound } from '../pages';
import MainRoutes from './MainRoutes';
import BranchRoutes from './BranchRoutes';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginDashboard />} />

        {/* super admin routes  */}
        <MainRoutes />

        {/* branch routes  */}
        <BranchRoutes />

        {/* ** not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
