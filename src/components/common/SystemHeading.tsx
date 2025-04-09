import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import SysHeadingProps from '../../lib/interfaces/SysHeading';

const SystemHeading: FC<SysHeadingProps> = ({
  title,
  length = 0,
  current = 0
}) => {
  const { t } = useTranslation();
  return (
    <div className=" mb-6 border-2 bg-white border-primary text-primary rounded-lg px-4 py-1 flex items-center justify-between gap-4">
      <span className=" text-base md:text-lg font-semibold">
        {t(`sysHeading.${title}`)}
      </span>
      <div className=" text-sm md:text-base font-medium flex items-center gap-1">
        <span>{`(${current} ${t('from')} ${length})`}</span>
        <span>{t('incorporation')}</span>
      </div>
    </div>
  );
};

export default SystemHeading;
