import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import { getCardTypeSchema } from '../../../../validation/cardTypeSchema';
import { Spin } from 'antd';
import useFetch from '../../../../hooks/useFetch';
import usePost from '../../../../hooks/usePost';
import CardTypeForm from './CardTypeForm';

interface IProps {
  close?: () => void;
  update?: boolean;
  id?: string | number;
}

const AddCardType: FC<IProps> = ({ close, update, id }) => {
  const endpoint = update
    ? `/bank/api/v1/bankCards/${id}`
    : '/bank/api/v1/bankCards';

  const { data: cardType, isLoading } = useFetch({
    endpoint,
    keys: ['cardType', id ?? ''],
    enabled: !!update && !!id,
  });

  const formObject: FieldValues = {
    mode: 'all',
    resolver: yupResolver(getCardTypeSchema(update)),
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm(formObject);

  useEffect(() => {
    if (cardType?.data) {
      setValue('name_ar', cardType?.data.lang_name.ar);
      setValue('name_en', cardType?.data.lang_name.en);
      setValue('is_max', cardType?.data.is_max);
    }
  }, [setValue, cardType?.data]);

  const { mutate, isPending } = usePost({
    endpoint,
    revalid: ['bank/api/v1/bankCards'],
    onSuccess: () => {
      if (close) {
        close();
      }
    },
  });

  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();

    formData.append('name[en]', data.name_en);
    formData.append('name[ar]', data.name_ar);
    formData.append('is_max', data.is_max);

    if (data.file) {
      formData.append('media[0]', data.file);
    }
    if (cardType?.data?.media && update) {
      cardType?.data?.media?.forEach((media: FieldValues, index: string) => {
        formData.append(`media_remove[${index}]`, media.id);
      });
    }
    if (update) {
      formData.append('_method', 'PUT');
    }
    mutate(formData);
  };
  return (
    <>
      <Spin spinning={isPending || isLoading} size="large">
        <CardTypeForm
          submit={handleSubmit(onSubmit)}
          control={control}
          errors={errors}
          key={cardType?.data?.media[0]?.original_url}
          keyV={cardType?.data?.media[0]?.original_url}
          update={update}
        />
      </Spin>
    </>
  );
};

export default AddCardType;
