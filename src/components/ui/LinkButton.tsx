import { FC } from 'react';
import ButtonProps from '../../lib/interfaces/ButtonInterface';
import { clsx } from 'clsx';
import { Link } from 'react-router';

const LinkButton: FC<ButtonProps> = ({
  title = '',
  cx = '',
  icon,
  href = ''
}) => {
  return (
    <>
      <Link
        to={href}
        className={clsx(`duration-300  active:scale-90 cursor-pointer ${cx}`)}
      >
        {title && <span>{title}</span>}
        {icon && icon}
      </Link>
    </>
  );
};

export default LinkButton;
