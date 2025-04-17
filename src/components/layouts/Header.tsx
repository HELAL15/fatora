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
import Button from '../ui/Button';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

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

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isPathnameStartWithBranch = pathname.startsWith('/branch');

  return (
    <>
      <header className=" sticky flex items-center justify-center max-lg:rounded-ee-4xl max-lg:rounded-es-4xl top-0 h-[77px] z-20 bg-white py-2 border-b border-b-slate-200">
        <div className="container-fluid  ">
          <div className="flex items-center justify-between flex-wrap py-4 gap-4 ">
            <div className="flex items-center gap-2 md:gap-4 ">
              {!isPathnameStartWithBranch && isMobileOrTablet ? (
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

              <div className=" flex items-center gap-1 md:gap-2 bg-light text-primary rounded-lg px-2 md:px-4 py-1">
                <h3 className="text-xs md:text-sm font-medium">username</h3>
                <Avatar size={isMobileOrTablet ? 25 : undefined} />
              </div>
              <div className=" max-md:hidden flex items-center gap-1 md:gap-2 ">
                <h3 className="text-sm md:text-lg font-medium">الفرع :</h3>
                <span>إدارة</span>
              </div>
            </div>
            <div className="flex items-stretch gap-2 md:gap-3">
              {/* lang changer comp  */}
              <ChangeLang />
              <Button
                outline
                title={isMobileOrTablet ? '' : t('logout')}
                icon={isMobileOrTablet ? <FaArrowLeft /> : ''}
                onClick={() => navigate('/login')}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default memo(Header);
