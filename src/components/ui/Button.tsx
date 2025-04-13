import { FC } from 'react';
import ButtonProps from '../../lib/interfaces/ButtonInterface';
import { clsx } from 'clsx';

const Button: FC<ButtonProps> = ({
  title = '',
  cx = '',
  icon,
  onClick,
  outline
}) => {
  return (
    <>
      <button
        onClick={onClick}
        className={clsx(
          ` cursor-pointer rounded-rounded duration-300 px-4 md:px-6 py-2 active:scale-90 border ${
            outline
              ? 'bg-transparent border-primary  hover:bg-primary text-primary hover:text-white'
              : 'bg-primary  border-transparent  hover:bg-secondary text-white'
          }   ${cx}`
        )}
      >
        {title && <span>{title}</span>}
        {icon && icon}
      </button>
    </>
  );
};

export default Button;
