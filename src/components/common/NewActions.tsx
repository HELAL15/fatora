import { Dropdown } from 'antd';
import { MenuProps } from 'antd/lib';
import { FC, memo } from 'react';

/**
 * ==> props interface
 */
interface IProps {
  menuItems?: MenuProps['items'];
}

/**
 * ==> Component
 */
const NewActions: FC<IProps> = ({ menuItems = [] }) => {
  return (
    <>
      <Dropdown
        overlayClassName="table-actions"
        menu={{ items: menuItems }}
        trigger={['click']}
      >
        <span className="text-2xl font-semibold cursor-pointer">...</span>
      </Dropdown>
    </>
  );
};

export default memo(NewActions);
