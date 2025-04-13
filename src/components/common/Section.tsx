import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface IProps {
  cx?: string;
  children: ReactNode;
}

const Section: FC<IProps> = ({ cx = '', children }) => {
  return (
    <>
      <section className={clsx(cx)}>{children}</section>
    </>
  );
};

export default Section;
