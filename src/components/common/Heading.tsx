import { FC, memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { IoAddOutline } from 'react-icons/io5';
import LinkButton from '../ui/LinkButton';
import SectionWithContainer from './SectionWithContainer';
import Button from '../ui/Button';
import useGoBack from '../../lib/utils/GoBack';

/**
 * ==> props interface
 */
interface IProps {
  title?: string;
  text?: string;
  href?: string;
  modal?: boolean;
  modalTitle?: string;
  icon?: ReactNode;
  formAction?: ReactNode;
  responsive?: boolean;
  body?: ReactNode;
  hasBack?: boolean;
}

/**
 * ==> Component
 */
const Heading: FC<IProps> = ({
  title,
  text,
  href = '',
  modal = false,
  modalTitle = 'Add New',
  icon = <IoAddOutline className="text-xl" />,
  body = null,
  hasBack
}) => {
  const { i18n, t } = useTranslation();
  const { language: lang } = i18n;
  const goBack = useGoBack();

  // for modal

  return (
    <>
      <SectionWithContainer cx="!mb-0">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">{t(`heading.${title}`)}</h1>
          {text && (
            <LinkButton
              title={t('tableHead.add', {
                name: t(`tableHead.${text}`)
              })}
              href={href}
            />
          )}

          <div className="flex items-center gap-2">
            {body && body}
            {hasBack && (
              <Button type="button" title="back" outline onClick={goBack} />
            )}
          </div>

          {modal && (
            <>
              <button
                onClick={() => open()}
                className="flex items-center gap-2 btn primary-btn"
              >
                {icon && lang === 'en' && icon}
                {t('tableHead.add', { name: t(`tableHead.${modalTitle}`) })}

                {icon && lang === 'ar' && icon}
              </button>
            </>
          )}
        </div>
      </SectionWithContainer>
    </>
  );
};

export default memo(Heading);
