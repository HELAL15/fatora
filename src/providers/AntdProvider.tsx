import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ConfigProvider } from 'antd';
import arEG from 'antd/locale/ar_EG';
import enUS from 'antd/locale/en_US';

interface IProps {
  children: ReactNode;
}

const AntdProvider: FC<IProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const direction = lang === 'ar' ? 'rtl' : 'ltr';
  const font = lang === 'ar' ? 'Tajawal' : 'sh-hello';
  const color = 'rgb(41 94 86)';

  const theme = {
    token: {
      colorPrimary: color,
      borderRadius: 10,
      fontFamily: font
    }
  };

  return (
    <>
      <ConfigProvider
        theme={theme}
        direction={direction}
        locale={lang === 'ar' ? arEG : enUS}
      >
        {children}
      </ConfigProvider>
    </>
  );
};

export default AntdProvider;
