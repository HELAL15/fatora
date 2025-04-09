import { useLayoutEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import Aside from './Aside';
import Menu from './Menu';
import Header from './Header';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [close, setClose] = useState(false);

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
