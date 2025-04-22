import { FC } from 'react';
import ButtonProps from '../../lib/interfaces/ButtonInterface';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

const Button: FC<ButtonProps> = ({
  title = '',
  cx = '',
  icon,
  onClick,
  outline,
  type = 'submit',
  disabled
}) => {
  const { t } = useTranslation();
  return (
    <>
      <button
        disabled={disabled}
        type={type}
        onClick={onClick}
        className={clsx(
          ` cursor-pointer capitalize rounded-rounded duration-300 px-4 md:px-6 py-2 active:scale-90 border ${
            outline
              ? 'bg-transparent border-primary  hover:bg-primary text-primary hover:text-white'
              : 'bg-primary  border-transparent  hover:bg-secondary text-white'
          }   ${cx}`
        )}
      >
        {title && <span>{t(`button.${title}`)}</span>}
        {icon && icon}
      </button>
    </>
  );
};

export default Button;
