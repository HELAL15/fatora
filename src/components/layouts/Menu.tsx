import { FC, memo, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu as MenuAntd } from 'antd';
import { IoClose, IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import type { MenuProps } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
// import logo from '../../../assets/images/logo.png';
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
const Menu: FC<IProps> = ({
  collapsed,
  toggleClose,
  toggleCollapsed,
  setClose
}) => {
  const location = useLocation();

  // const [selectedKey, setSelectedKey] = useState<string>(location.pathname);
  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 991px)' });
  useEffect(() => {
    // setSelectedKey(location.pathname);
    setClose(false);
  }, [location, isMobileOrTablet, setClose]);

  const { t } = useTranslation();

  const items: MenuItem[] = [
    {
      key: '/',
      icon: <IoHomeOutline className="!text-xl" />,
      label: (
        <NavLink
          className={({ isActive }) =>
            `text-base  ${isActive ? 'font-bold' : 'font-medium'}`
          }
          to="/"
        >
          {t('aside.home')}
        </NavLink>
      )
    },
    {
      key: '/system',
      icon: <IoSettingsOutline className="!text-xl" />,
      label: (
        <NavLink
          className={({ isActive }) =>
            `text-base ${isActive ? 'font-bold' : 'font-medium '}`
          }
          to="/system"
        >
          {t('aside.system')}
        </NavLink>
      )
    }
  ];
  const itemKeys = items
    .filter((item) => item !== null)
    .map((item) => item.key);

  const selectedKey =
    itemKeys
      .filter((key): key is string => key !== undefined)
      .filter((key) => location.pathname.startsWith(key))
      .sort((a, b) => b.length - a.length)[0] || '/';

  return (
    <>
      <div className="logo  h-[73px] relative font-bold text-2xl py-4 px-3 mt-1 border-b border-b-slate-200 flex items-center justify-between">
        {/* <img
          draggable={false}
          src={logo}
          alt="jawraa logo"
          className={`mx-auto ${
            collapsed ? 'w-full' : 'w-[180px]'
          }  h-[45px] object-contain`}
        /> */}
        <h2
          className={`text-center text-primary font-bold duration-300 w-full ${
            collapsed ? 'text-lg' : 'text-4xl'
          }`}
        >
          {t('fatora')}
        </h2>
        <button onClick={toggleClose} className="block lg:hidden">
          <IoClose />
        </button>
        <div className="  ">
          {isMobileOrTablet ? (
            ''
          ) : (
            <button
              className="absolute cursor-pointer z-50 ltr:-right-4 rtl:-left-4 -bottom-4 rounded-full shadow-2xs grid place-items-center bg-white duration-300 hover:bg-secondary hover:text-white size-8 text-center"
              onClick={toggleCollapsed}
            >
              {collapsed ? (
                <MenuUnfoldOutlined className="text-lg" />
              ) : (
                <MenuFoldOutlined className="text-lg" />
              )}
            </button>
          )}
        </div>
      </div>
      <nav className=" pt-4 flex-grow overflow-y-auto flex flex-col= justify-center relative">
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
