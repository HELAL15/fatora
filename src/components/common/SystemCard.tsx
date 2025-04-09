import { useTranslation } from 'react-i18next';
import { FaPlus, MdOutlineRemoveRedEye } from '../icons';
import Button from '../ui/Button';
import { FC } from 'react';
import LinkButton from '../ui/LinkButton';

interface IProps {
  title?: string;
  add?: boolean;
  view?: string;
}

const SystemCard: FC<IProps> = ({ title = '', add, view = '' }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-secondary text-white py-7 px-5 rounded-lg flex items-center justify-between gap-4">
      <p className="text-sm font-semibold">{t(title)}</p>
      <div className="flex items-center gap-3">
        {add && <Button icon={<FaPlus />} cx="text-xl" />}
        {view && (
          <LinkButton
            href={view}
            icon={<MdOutlineRemoveRedEye />}
            cx="text-2xl"
          />
        )}
      </div>
    </div>
  );
};

export default SystemCard;
