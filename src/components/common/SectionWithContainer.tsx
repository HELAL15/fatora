import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface IProps {
  cx?: string;
  children: ReactNode;
}

const SectionWithContainer: FC<IProps> = ({ cx = '', children }) => {
  return (
    <>
      <section className={clsx(cx)}>
        <div className="container-fluid">{children}</div>
      </section>
    </>
  );
};

export default SectionWithContainer;
