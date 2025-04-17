import * as yup from 'yup';
import i18n from 'i18next';

export const getAddZakatSchema = () => {
  return yup.object().shape({
    invoiceType: yup.string().required(i18n.t('input.validation.required')),
    temporaryPassword: yup.string().required(i18n.t('input.validation.required')),
    email: yup.string().email(i18n.t('validation.invalidEmail')).required(i18n.t('input.validation.required')),
    commonName: yup.string().required(i18n.t('input.validation.required')),
    organizerUnit: yup.string().required(i18n.t('input.validation.required')),
    organizingName: yup.string().required(i18n.t('input.validation.required')),
    tax: yup.string().required(i18n.t('input.validation.required')),
    registeredAddress: yup.string().required(i18n.t('input.validation.required')),
    supplyActivities: yup.string().required(i18n.t('input.validation.required')),
    serialNumber: yup.string().required(i18n.t('input.validation.required')),
    registrationNumber: yup.string().required(i18n.t('input.validation.required'))
  });
};
