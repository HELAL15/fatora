// hooks/useAddBank.ts
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { getAddBankSchema } from '../validation/addBankValidation';
import usePost from '../hooks/usePost';

interface IProps {
  update?: boolean;
  id?: string | number;
  close?: () => void;
}

const useAddBank = ({ update, id, close }: IProps) => {
  const endpoint = update ? `/bank/api/v1/banks/${id}` : '/bank/api/v1/banks';

  const { data: bankInfo, isLoading } = useFetch({
    endpoint,
    keys: ['bank', id ?? ''],
    enabled: !!update && !!id,
  });

  const formObject: FieldValues = {
    mode: 'all',
    resolver: yupResolver(getAddBankSchema(update)),
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm(formObject);

  useEffect(() => {
    if (bankInfo?.data) {
      setValue('bank_ar', bankInfo.data.lang_name.ar);
      setValue('bank_en', bankInfo.data.lang_name.en);
    }
  }, [setValue, bankInfo?.data]);

  const { mutate, isPending } = usePost({
    endpoint,
    revalid: ['bank/api/v1/banks'],
    onSuccess: () => {
      close?.();
    },
  });

  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();
    formData.append('name[ar]', data.bank_ar);
    formData.append('name[en]', data.bank_en);
    if (data.file) {
      formData.append('media[0]', data.file);
    }

    if (bankInfo?.data?.media && update) {
      bankInfo.data.media.forEach((media: FieldValues, index: string) => {
        formData.append(`media_remove[${index}]`, media.id);
      });
    }

    if (update) {
      formData.append('_method', 'PUT');
    }

    mutate(formData);
  };

  return {
    control,
    errors,
    isLoading,
    isPending,
    handleSubmit,
    onSubmit,
    bankMediaKey: bankInfo?.data?.media?.[0]?.original_url,
  };
};

export default useAddBank;
