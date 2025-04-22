import { FC, ReactNode } from 'react';
import { Link } from 'react-router';

interface IProps {
  href: string;
  icon?: ReactNode;
  title?: string;
}

const HomeCard: FC<IProps> = ({ href = '', icon = '', title = '' }) => {
  return (
    <Link
      to={href}
      className="card group flex items-center gap-4 rounded-rounded px-6 py-8 bg-white shadow-shadow duration-300 hover:bg-secondary/80 text-primary hover:text-white"
    >
      {icon && <i className="text-4xl"> {icon}</i>}
      <div className="flex flex-col gap-1">
        {title && <span className="font-semibold text-base">{title}</span>}
        <span className="text-secondary duration-200 group-hover:text-white">
          400
        </span>
      </div>
    </Link>
  );
};

export default HomeCard;
