import { FC, memo } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
// import { CiSearch } from 'react-icons/ci';
import ChangeLang from '../common/ChangeLang';
// import UserDropdown from '../ui/UserDropdown';
// import Notifications from '../ui/Notifications';
// import AdminDropdown from '../ui/AdminDropdown';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'antd';

/**
 * ==> props interface
 */
interface IProps {
  headerTitle?: string;
  collapsed?: boolean;
  toggleCollapsed: () => void;
  toggleClose: () => void;
}

/**
 * ==> Component
 */
const Header: FC<IProps> = ({
  collapsed,
  toggleCollapsed,
  toggleClose,
  headerTitle = ''
}) => {
  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 991px)' });

  const { t } = useTranslation();

  return (
    <>
      <header className=" relative top-0 z-20">
        <div className="container-fluid  ">
          <div className="flex items-center justify-between flex-wrap py-4 gap-4 ">
            <div className="flex items-center gap-3 md:gap-4 ">
              {isMobileOrTablet ? (
                <button
                  className="grid place-items-center cursor-pointer"
                  onClick={toggleClose}
                >
                  {collapsed ? (
                    <MenuUnfoldOutlined className="text-lg" />
                  ) : (
                    <MenuFoldOutlined className="text-lg" />
                  )}
                </button>
              ) : (
                <button
                  className="grid place-items-center cursor-pointer"
                  onClick={toggleCollapsed}
                >
                  {collapsed ? (
                    <MenuUnfoldOutlined className="text-lg" />
                  ) : (
                    <MenuFoldOutlined className="text-lg" />
                  )}
                </button>
              )}

              <div className="max-md:hidden">
                <h3 className=" text-xl font-bold">
                  {' '}
                  {headerTitle ? (
                    `${headerTitle} 👋🏼`
                  ) : (
                    <Skeleton.Input active={true} />
                  )}{' '}
                </h3>
                <p className="opacity-50">{t('summary')}</p>
              </div>
            </div>
            {/* <form className="flex max-lg:order-5 w-full lg:w-[300px] xl:w-[400px]  max-lg:flex-grow items-center bg-white gap-4 py-2 h-[42px] px-4  rounded-rounded shadow-shadow">
              <button className="" type="submit">
                <CiSearch className="text-2xl" />
              </button>
              <input
                type="text"
                placeholder="search here"
                className=" outline-none w-full h-full bg-transparent"
              />
            </form> */}
            <div className="flex items-stretch gap-3 md:gap-3">
              {/* <DatePicker
                className="!border-none !outline-none shadow-shadow h-[42px] max-w-36"
                onChange={() => {
                  console.log('date changed');
                }}
                needConfirm
              /> */}

              {/* lang changer comp  */}
              <ChangeLang />
              {/* notification comp */}
              {/* <Notifications /> */}

              {/* <AdminDropdown /> */}

              {/* user dropdown comp */}
              {/* <UserDropdown /> */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default memo(Header);
