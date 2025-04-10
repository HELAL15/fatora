import { FC, memo } from 'react';

interface IProps {
  img?: string;
  price?: number | string;
}

const BankTypePrice: FC<IProps> = ({ img, price }) => {
  return (
    <div className="border-2 flex flex-col items-center border-light rounded-lg overflow-hidden">
      <img src={img} alt="" className="object-contain h-16 w-24" />
      <p className="bg-light px-4 text-sm py-1 w-full text-center font-bold">
        {price}
      </p>
    </div>
  );
};

export default memo(BankTypePrice);
