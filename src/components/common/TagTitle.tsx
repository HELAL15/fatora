import { FC } from 'react';
import TagInterface from '../../lib/interfaces/TagInterface';
import { useTranslation } from 'react-i18next';

const TagTitle: FC<TagInterface> = ({ title = 'DUMMY_TEXT' }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-primary block mx-auto text-lg font-bold w-fit my-8 text-white px-14 py-2 rounded-xl">
      {t(`tag.${title}`)}
    </div>
  );
};

export default TagTitle;
