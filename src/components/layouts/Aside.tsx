import { FC, memo, ReactNode } from 'react';

interface IProps {
  collapsed?: boolean;
  toggleCollapsed?: () => void;
  setCollapsed: (collapsed: boolean) => void;
  close?: boolean;
  toggleClose?: () => void;
  setClose: (close: boolean) => void;
  children?: ReactNode;
}

const Aside: FC<IProps> = ({ collapsed, close, children }) => {
  return (
    <aside
      className={` flex flex-col pb-5 fixed lg:sticky  top-0 shadow-shadow 
    ${
      close ? 'inset-x-0' : 'inset-x-[-100%]'
    } lg:inset-x-0 shadow-shadow h-dvh z-50 bg-body-secondary duration-300 w-[95%] md:w-[40%] 
    ${collapsed ? 'lg:w-[100px] ' : 'lg:w-[18%]'} 
    flex-shrink-0`}
    >
      {children}
    </aside>
  );
};

export default memo(Aside);
