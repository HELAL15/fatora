import { FC, memo, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu as MenuAntd } from 'antd';
import { IoClose } from 'react-icons/io5';
import type { MenuProps } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
// import logo from '../../../assets/images/logo.png';
import { LuLayoutDashboard } from 'react-icons/lu';

/**
 * ==> props interface
 */
interface IProps {
  collapsed?: boolean;
  toggleCollapsed?: () => void;
  setCollapsed: (collapsed: boolean) => void;
  close?: boolean;
  toggleClose?: () => void;
  setClose: (close: boolean) => void;
}
type MenuItem = Required<MenuProps>['items'][number];

/**
 * ==> Component
 */
const Menu: FC<IProps> = ({ collapsed, toggleClose, setClose }) => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname);
  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 991px)' });
  useEffect(() => {
    setSelectedKey(location.pathname);
    setClose(false);
  }, [location, isMobileOrTablet, setClose]);

  const { t } = useTranslation();

  const items: MenuItem[] = [
    {
      key: '/',
      icon: <LuLayoutDashboard className="!text-xl" />,
      label: (
        <NavLink className={'text-sm font-normal'} to="/">
          {t('aside.home')}
        </NavLink>
      )
    },
    {
      key: 'sub0',
      icon: (
        <i className="text-lg">
          <LuLayoutDashboard />
        </i>
      ),
      label: (
        <span className="text-base font-normal">
          {t('aside.adminControl.index')}
        </span>
      ),
      children: [
        {
          key: '/dashboard/regions',
          label: (
            <NavLink className={'text-sm font-normal'} to="/dashboard/regions">
              {t('aside.adminControl.region')}
            </NavLink>
          )
        },
        {
          key: '/dashboard/cities',
          label: (
            <NavLink className={'text-sm font-normal'} to="/dashboard/cities">
              {t('aside.adminControl.cities')}
            </NavLink>
          )
        },
        {
          key: '/dashboard/education-levels',
          label: (
            <NavLink
              className={'text-sm font-normal'}
              to="/dashboard/education-levels"
            >
              {t('aside.adminControl.educationalLevel')}
            </NavLink>
          )
        },
        {
          key: '/dashboard/users',
          label: (
            <NavLink className={'text-sm font-normal'} to="/dashboard/users">
              {t('aside.adminControl.users')}
            </NavLink>
          )
        },
        {
          key: '/dashboard/roles',
          label: (
            <NavLink className={'text-sm font-normal'} to="/dashboard/roles">
              {t('aside.adminControl.role')}
            </NavLink>
          )
        }
        // {
        //   key: '/dashboard/how-to-know',
        //   label: (
        //     <NavLink
        //       className={'text-sm font-normal'}
        //       to="/dashboard/how-to-know"
        //     >
        //       {t('aside.adminControl.howToKnow')}
        //     </NavLink>
        //   )
        // }
      ]
    }
  ];

  return (
    <>
      <div className="logo font-bold text-2xl py-4 px-3 mt-1 border-b border-b-slate-200 flex items-center justify-between">
        {/* <img
          draggable={false}
          src={logo}
          alt="jawraa logo"
          className={`mx-auto ${
            collapsed ? 'w-full' : 'w-[180px]'
          }  h-[45px] object-contain`}
        /> */}
        <h2 className="text-center text-3xl w-full">Fatora</h2>
        <button onClick={toggleClose} className="block lg:hidden">
          <IoClose />
        </button>
      </div>
      <nav className=" flex-grow overflow-y-auto flex flex-col= justify-center">
        <MenuAntd
          selectedKeys={[selectedKey]}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
          className="w-full !border-none"
        />
      </nav>
    </>
  );
};

export default memo(Menu);
