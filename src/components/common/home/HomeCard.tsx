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
      className="card flex items-center gap-4 rounded-rounded px-6 py-10 bg-white shadow-shadow duration-300 hover:bg-secondary/80 text-primary hover:text-white"
    >
      {icon && <i> {icon}</i>}
      {title && <span className="font-semibold">{title}</span>}
    </Link>
  );
};

export default HomeCard;
