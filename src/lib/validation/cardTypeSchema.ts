import * as yup from 'yup';
import i18n from 'i18next';

export const getCardTypeSchema = () => {
  return yup.object().shape({
    type_ar: yup.string().required(i18n.t('input.validation.required')),
    type_en: yup.string().required(i18n.t('input.validation.required')),
    file: yup.mixed().required(i18n.t('input.validation.required')),
  });
};
