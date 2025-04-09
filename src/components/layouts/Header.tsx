import { FC, memo } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
// import { CiSearch } from 'react-icons/ci';
import ChangeLang from '../common/ChangeLang';
// import UserDropdown from '../ui/UserDropdown';
// import Notifications from '../ui/Notifications';
// import AdminDropdown from '../ui/AdminDropdown';
// import { useTranslation } from 'react-i18next';
import { Avatar } from 'antd';

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
const Header: FC<IProps> = ({ collapsed, toggleClose }) => {
  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 991px)' });

  // const { t } = useTranslation();

  return (
    <>
      <header className=" sticky flex items-center justify-center top-0 h-[77px] z-20 bg-white py-2 border-b border-b-slate-200">
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
                ''
              )}

              <div className="max-md:hidden flex items-center gap-2 bg-gray-200 rounded-lg px-4 py-1">
                <h3 className=" text-sm font-medium">
                  {/* {' '}
                  {headerTitle ? (
                    `${headerTitle} 👋🏼`
                  ) : (
                    <Skeleton.Input active={true} />
                  )}{' '} */}
                  username
                </h3>
                <Avatar />
                {/* <p className="opacity-50">{t('summary')}</p> */}
              </div>
              <div className="max-md:hidden flex items-center gap-2 ">
                <h3 className=" text-lg font-medium">الفرع :</h3>
                <span>إدارة</span>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              {/* lang changer comp  */}
              <ChangeLang />
              <button className="rounded-lg max-md:text-sm text-white bg-primary px-4 md:px-8 py-2 cursor-pointer">
                تسجيل الخروح
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default memo(Header);
