import { FC, memo } from 'react';

interface IProps {
  title?: string;
  desc?: string;
}

const TitleInfo: FC<IProps> = ({ title = '----', desc = '----' }) => {
  return (
    <p className=" flex items-center gap-1">
      <span className="font-bold ">{title} : </span>
      <span className="text-sm">{desc}</span>
    </p>
  );
};

export default memo(TitleInfo);
