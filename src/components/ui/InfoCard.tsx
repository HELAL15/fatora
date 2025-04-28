import { FC } from 'react';

interface IProps {
  title?: string;
  desc?: string;
}

const InfoCard: FC<IProps> = ({ title = '---', desc = '---' }) => {
  return (
    <>
      <div className="bg-white group rounded-rounded overflow-hidden shadow-md ">
        <p className="heading duration-300 group-hover:bg-secondary bg-primary px-3 py-7 text-white text-center text-sm font-semibold">
          {title}
        </p>
        <p className="desc px-3 py-4 text-center font-semibold text-sm">
          {desc}
        </p>
      </div>
    </>
  );
};

export default InfoCard;
