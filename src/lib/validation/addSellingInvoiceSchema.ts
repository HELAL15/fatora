import * as yup from 'yup';
import i18n from 'i18next';

export const getAddSellingInvoiceSchema = () => {
  return yup.object().shape({
    number: yup.string().required(i18n.t('input.validation.required')),
    category: yup.string().required(i18n.t('input.validation.required')),
    item: yup.string().required(i18n.t('input.validation.required')),
    cost: yup.string().required(i18n.t('input.validation.required')),
    price: yup.string().required(i18n.t('input.validation.required')),
    total: yup.string().required(i18n.t('input.validation.required')),
  });
};

export const getAddSellingInvoiceClientSchema = () => {
  return yup.object().shape({
    clientName: yup.string().required(i18n.t('input.validation.required')),
    date: yup.string().required(i18n.t('input.validation.required')),
  });
};