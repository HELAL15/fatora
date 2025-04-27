import * as yup from 'yup';
import i18n from 'i18next';

export const getAddBankAccountSchema = () => {
  return yup.object().shape({
    iban: yup.string().required(i18n.t('input.validation.required')),
    swift: yup.string().required(i18n.t('input.validation.required')),
    branch: yup.string().required(i18n.t('input.validation.required')),
    bank: yup.string().required(i18n.t('input.validation.required')),
    purpose: yup.string().required(i18n.t('input.validation.required')),
    city: yup.string().required(i18n.t('input.validation.required')),
    country: yup.string().required(i18n.t('input.validation.required')),
    accountNumber: yup.string().required(i18n.t('input.validation.required')),
  });
};
