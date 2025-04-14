import { FC, memo } from 'react';
import Img from './Img';

interface IProps {
  img?: string;
  price?: number | string;
}

const BankTypePrice: FC<IProps> = ({ img = '', price }) => {
  return (
    <div className="border-2 flex flex-col items-center border-light rounded-lg overflow-hidden">
      <Img src={img} alt="method type" cx="object-contain h-10 w-18 m-4" />
      <p className="bg-light px-4 text-sm py-1 w-full text-center font-bold">
        {price}
      </p>
    </div>
  );
};

export default memo(BankTypePrice);
