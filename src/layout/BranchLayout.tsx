import { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import Header from '../components/layouts/Header';

const BranchLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [close, setClose] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleClose = () => {
    setClose(!close);
    setCollapsed(false);
  };
  const { pathname } = useLocation();

  return (
    <>
      {pathname === '/branch' ? null : (
        <Header
          headerTitle="fff"
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
          toggleClose={toggleClose}
        />
      )}
      <main className="max-lg:w-dvw relative">
        {/* <BreadCrumb /> */}
        <Outlet />
      </main>
    </>
  );
};

export default BranchLayout;
