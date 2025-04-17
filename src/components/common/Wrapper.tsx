import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  cx?: string;
}

const Wrapper: FC<IProps> = ({ children, cx = '' }) => {
  return (
    <div
      className={clsx(
        `bg-white rounded-rounded py-6 md:py-8 px-4 md:px-6 ${cx}`
      )}
    >
      {children}
    </div>
  );
};

export default Wrapper;
