import { FC, ReactNode } from 'react';
import { TbReportAnalytics } from 'react-icons/tb';
import { Link } from 'react-router';
interface IProps {
  href?: string;
  icon?: ReactNode;
  title?: string;
  viewHref?: string;
  viewTitle?: string;
}
const BranchHomeCard: FC<IProps> = ({
  href = '',
  icon = '',
  title,
  viewHref = '',
  viewTitle = ''
}) => {
  return (
    <div className="space-y-6">
      <Link
        to={href}
        className="card-main block bg-white rounded-rounded overflow-hidden text-center group "
      >
        <div className="content px-4 py-10 flex flex-col gap-4 justify-center items-center duration-300 group-hover:bg-primary ">
          <i className="text-6xl duration-300 group-hover:text-white text-primary">
            {icon}
          </i>
        </div>
        <p className="card-footer bg-secondary py-3 px-4 text-white text-base font-semibold">
          {title}
        </p>
      </Link>
      <Link
        to={viewHref}
        className="bg-white text-primary duration-300 hover:bg-secondary hover:text-white text-base font-semibold rounded-rounded px-4 py-3 flex items-center justify-center gap-2"
      >
        <i className="text-2xl">
          <TbReportAnalytics />
        </i>
        <span>{viewTitle}</span>
      </Link>
    </div>
  );
};

export default BranchHomeCard;
