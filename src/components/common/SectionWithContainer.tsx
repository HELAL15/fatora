import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface IProps {
  cx?: string;
  children: ReactNode;
  containerCx?: string;
}

const SectionWithContainer: FC<IProps> = ({
  cx = '',
  containerCx = '',
  children
}) => {
  return (
    <>
      <section className={clsx(cx)}>
        <div className={clsx(`container-fluid ${containerCx}`)}>{children}</div>
      </section>
    </>
  );
};

export default SectionWithContainer;
