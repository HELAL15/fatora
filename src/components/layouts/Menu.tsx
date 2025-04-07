import { FC, memo, useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
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
  const { id } = useParams();

  const items: MenuItem[] = [
    {
      key: '/dashboard',
      icon: <LuLayoutDashboard className="!text-xl" />,
      label: (
        <NavLink className={'text-sm font-normal'} to="/dashboard">
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
    },
    {
      key: 'sub1',
      label: (
        <span className="text-base font-normal">{t('aside.org.index')}</span>
      ),
      icon: (
        <i className="text-lg">
          <LuLayoutDashboard />
        </i>
      ),
      children: [
        {
          key: `/dashboard/organizations${id ? `/${id}` : ''}`,
          label: (
            <NavLink
              className={'text-sm font-normal'}
              to="/dashboard/organizations"
            >
              {t('aside.org.org')}
            </NavLink>
          )
        },
        {
          key: '/dashboard/organizations/add-new-organization',
          label: (
            <NavLink
              className={'text-sm font-normal'}
              to="/dashboard/organizations/add-new-organization"
            >
              {t('aside.org.add')}
            </NavLink>
          )
        }
      ]
    },
    {
      key: 'sub2',
      label: (
        <span className="text-base font-normal">
          {t('aside.products.index')}
        </span>
      ),
      icon: (
        <i className="text-lg">
          <LuLayoutDashboard />
        </i>
      ),
      children: [
        {
          key: '/dashboard/brands',
          label: (
            <NavLink className={'text-sm font-normal'} to="/dashboard/brands">
              {t('aside.products.brands')}
            </NavLink>
          )
        },
        {
          key: `/dashboard/categories${id ? `/${id}` : ''}`,
          label: (
            <NavLink
              className={'text-sm font-normal'}
              to="/dashboard/categories"
            >
              {t('aside.products.categories')}
            </NavLink>
          )
        },
        {
          key: '/dashboard/products',
          label: (
            <NavLink className={'text-sm font-normal'} to="/dashboard/products">
              {t('aside.products.products')}
            </NavLink>
          )
        },
        {
          key: '/dashboard/colors',
          label: (
            <NavLink className={'text-sm font-normal'} to="/dashboard/colors">
              {t('aside.products.colors')}
            </NavLink>
          )
        }
      ]
    },
    {
      key: 'sub3',
      label: (
        <span className="text-base font-normal">
          {t('aside.courses.index')}
        </span>
      ),
      icon: (
        <i className="text-lg">
          <LuLayoutDashboard />
        </i>
      ),
      children: [
        {
          key: '/dashboard/courses',
          label: (
            <NavLink className={'text-sm font-normal'} to="/dashboard/courses">
              {t('aside.courses.courses')}
            </NavLink>
          )
        }
      ]
    },
    {
      key: 'sub4',
      label: (
        <span className="text-base font-normal">
          {t('aside.contacts.index')}
        </span>
      ),
      icon: (
        <i className="text-lg">
          <LuLayoutDashboard />
        </i>
      ),
      children: [
        {
          key: '/dashboard/contacts',
          label: (
            <NavLink className={'text-sm font-normal'} to="/dashboard/contacts">
              {t('aside.contacts.contacts')}
            </NavLink>
          )
        }
      ]
    },
    {
      key: 'sub6',
      label: (
        <span className="text-base font-normal">{t('aside.orders.index')}</span>
      ),
      icon: (
        <i className="text-lg">
          <LuLayoutDashboard />
        </i>
      ),
      children: [
        {
          key: '/dashboard/orders',
          label: (
            <NavLink className={'text-sm font-normal'} to="/dashboard/orders">
              {t('aside.orders.orders')}
            </NavLink>
          )
        },
        {
          key: '/dashboard/payment',
          label: (
            <NavLink className={'text-sm font-normal'} to="/dashboard/payment">
              {t('aside.orders.payment')}
            </NavLink>
          )
        }
      ]
    },
    {
      key: 'sub7',
      label: (
        <span className="text-base font-normal">{t('aside.terms.index')}</span>
      ),
      icon: (
        <i className="text-lg">
          <LuLayoutDashboard />
        </i>
      ),
      children: [
        {
          key: '/dashboard/terms&conditions',
          label: (
            <NavLink
              className={'text-sm font-normal'}
              to="/dashboard/terms&conditions"
            >
              {t('aside.terms.terms')}
            </NavLink>
          )
        }
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
        <button onClick={toggleClose} className="block lg:hidden">
          <IoClose />
        </button>
      </div>
      <nav className=" flex-grow overflow-y-auto">
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
