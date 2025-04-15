import { FC, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const Wrapper: FC<IProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-rounded py-6 md:py-8 px-4 md:px-6">
      {children}
    </div>
  );
};

export default Wrapper;
