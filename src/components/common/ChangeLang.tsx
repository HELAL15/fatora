import { useTranslation } from 'react-i18next';
import { TfiWorld } from 'react-icons/tfi';
import { useLocation, useNavigate } from 'react-router';

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
    <button
      onClick={changeLang}
      className="flex items-center gap-1 cursor-pointer"
    >
      <TfiWorld className="text-xl" />
      {language === 'ar' ? 'En' : 'Ar'}
    </button>
  );
};

export default ChangeLang;
