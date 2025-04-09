import { FC } from 'react';
import ButtonProps from '../../lib/interfaces/ButtonInterface';
import { clsx } from 'clsx';

const Button: FC<ButtonProps> = ({ title = '', cx = '', icon }) => {
  return (
    <>
      <button className={clsx(` cursor-pointer ${cx}`)}>
        {title && <span>{title}</span>}
        {icon && icon}
      </button>
    </>
  );
};

export default Button;
