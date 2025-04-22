import * as yup from 'yup';
import i18n from 'i18next';

export const getAddBankSchema = () => {
  return yup.object().shape({
    bank_ar: yup.string().required(i18n.t('input.validation.required')),
    bank_en: yup.string().required(i18n.t('input.validation.required')),
    file: yup.mixed().required(i18n.t('input.validation.required')),
  });
};
