import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  cx?: string;
  inModal?: boolean;
}

const Wrapper: FC<IProps> = ({ children, cx = '', inModal = false }) => {
  return (
    <div
      className={clsx(
        `${
          inModal ? 'bg-secondary/10' : 'bg-white'
        } rounded-rounded py-6 md:py-8 px-4 md:px-6 ${cx}`
      )}
    >
      {children}
    </div>
  );
};

export default Wrapper;
