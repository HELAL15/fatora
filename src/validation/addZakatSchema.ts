import * as yup from 'yup';
import i18n from 'i18next';

export const getAddZakatSchema = () => {
  return yup.object().shape({
    invoiceType: yup.string().required(i18n.t('validation.invoiceType')),
    temporaryPassword: yup.string().required(i18n.t('validation.temporaryPassword')),
    email: yup.string().email(i18n.t('validation.invalidEmail')).required(i18n.t('validation.email')),
    commonName: yup.string().required(i18n.t('validation.commonName')),
    organizerUnit: yup.string().required(i18n.t('validation.organizerUnit')),
    organizingName: yup.string().required(i18n.t('validation.organizingName')),
    tax: yup.string().required(i18n.t('validation.tax')),
    registeredAddress: yup.string().required(i18n.t('validation.registeredAddress')),
    supplyActivities: yup.string().required(i18n.t('validation.supplyActivities')),
    serialNumber: yup.string().required(i18n.t('validation.serialNumber')),
    registrationNumber: yup.string().required(i18n.t('validation.registrationNumber'))
  });
};
