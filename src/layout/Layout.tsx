import { useLayoutEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';

import { useMediaQuery } from 'react-responsive';
import Aside from '../components/layouts/Aside';
import Menu from '../components/layouts/Menu';
import Header from '../components/layouts/Header';

const Layout = () => {
  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 991px)' });
  const [collapsed, setCollapsed] = useState(isMobileOrTablet ? false : true);
  const [close, setClose] = useState(isMobileOrTablet ? false : true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleClose = () => {
    setClose(!close);
    setCollapsed(false);
  };

  // return page to top when route changes
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.key]);

  return (
    <>
      {/* <CustomHelmet /> */}
      <div className="flex overflow-x-clip dashboard-layout">
        <Aside
          collapsed={collapsed}
          close={close}
          setClose={setClose}
          toggleClose={toggleClose}
          setCollapsed={setCollapsed}
          toggleCollapsed={toggleCollapsed}
        >
          <Menu
            collapsed={collapsed}
            close={close}
            setClose={setClose}
            toggleClose={toggleClose}
            setCollapsed={setCollapsed}
            toggleCollapsed={toggleCollapsed}
          />
        </Aside>
        <div className="flex-grow w-3/4 overflow-x-clip  ">
          <Header
            headerTitle="fff"
            collapsed={collapsed}
            toggleCollapsed={toggleCollapsed}
            toggleClose={toggleClose}
          />

          <main className="max-lg:w-dvw relative">
            {/* <BreadCrumb /> */}
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
