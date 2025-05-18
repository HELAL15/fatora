import * as yup from 'yup';
import i18n from 'i18next';

export const getBranchSchema = () => {
  return yup.object().shape({
    nameEn:yup.string().required(i18n.t('input.validation.required')),
    nameAr:yup.string().required(i18n.t('input.validation.required')),
    phone:yup.string().required(i18n.t('input.validation.required')),
    branch_number:yup.string().required(i18n.t('input.validation.required')),
    market_number:yup.string().required(i18n.t('input.validation.required')),
    address:yup.string().required(i18n.t('input.validation.required')),
    fax: yup.string().required(i18n.t('input.validation.required')),
    commercial_register: yup.string().required(i18n.t('input.validation.required')),
    zakah_name:yup.string().required(i18n.t('input.validation.required'))
  });
};
