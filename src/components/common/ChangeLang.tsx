import { useTranslation } from 'react-i18next';
import { TfiWorld } from 'react-icons/tfi';
import { useLocation, useNavigate } from 'react-router';
import Button from '../ui/Button';

const ChangeLang = () => {
  const { i18n } = useTranslation();
  const { language, changeLanguage } = i18n;
  const navigate = useNavigate();
  const location = useLocation();

  const changeLang = () => {
    if (changeLanguage) {
      changeLanguage(language === 'en' ? 'ar' : 'en');
      navigate(location, { replace: true });
    } else {
      console.error('changeLanguage function is not available');
    }
  };

  return (
    <Button
      cx="flex items-center gap-1 !px-2"
      onClick={changeLang}
      title={language === 'ar' ? 'en' : 'ar'}
      icon={<TfiWorld className="text-base" />}
    />
  );
};

export default ChangeLang;
