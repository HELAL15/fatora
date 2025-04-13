import clsx from 'clsx';
import { FC, memo } from 'react';

interface IProps {
  title?: string;
  desc?: string;
  cx?: string;
}

const TitleInfo: FC<IProps> = ({ title = '----', desc = '----', cx = '' }) => {
  return (
    <p className={clsx(`flex items-center gap-1 ${cx}`)}>
      <span className="font-bold ">{title} : </span>
      <span className="text-sm">{desc}</span>
    </p>
  );
};

export default memo(TitleInfo);
