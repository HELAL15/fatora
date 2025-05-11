import * as yup from 'yup';
import i18n from 'i18next';

export const getAddBankAccountSchema = () => {
  return yup.object().shape({
    iban_number: yup.string().required(i18n.t('input.validation.required')),
    swift_number: yup.string().required(i18n.t('input.validation.required')),
    bank_id: yup.string().required(i18n.t('input.validation.required')),
    account_number: yup.string().required(i18n.t('input.validation.required')),
  });
};
