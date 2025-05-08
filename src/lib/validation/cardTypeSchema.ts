import * as yup from 'yup';
import i18n from 'i18next';

export const getCardTypeSchema = (update:boolean|undefined) => {
  return yup.object().shape({
    name_ar: yup.string().required(i18n.t('input.validation.required')),
    name_en: yup.string().required(i18n.t('input.validation.required')),
    is_max: yup.number().required(i18n.t('input.validation.required')),
    file:update?yup.mixed(): yup.mixed().required(i18n.t('input.validation.required')),
  });
};
