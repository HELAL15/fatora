import { Image } from 'antd';
import { FC } from 'react';

interface IProps {
  src?: string;
}

const ImageViewerTable: FC<IProps> = ({ src }) => {
  return (
    <Image
      src={src}
      alt="table image"
      draggable="false"
      className="!object-contain !size-10 !mx-auto"
    />
  );
};

export default ImageViewerTable;
