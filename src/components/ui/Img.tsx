import clsx from 'clsx';
import { FC } from 'react';

interface IProps {
  alt?: string;
  src: string;
  cx?: string;
}

const Img: FC<IProps> = ({ alt = '', src = '', cx = '' }) => {
  return (
    <img
      className={clsx(cx)}
      src={src}
      alt={alt}
      loading="lazy"
      draggable="false"
    />
  );
};

export default Img;
