import { FieldValues, useForm } from 'react-hook-form';
import FormInput from '../../FormInput';
import ImageUploader from '../../ImageUploader';
import Button from '../../../ui/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import { getCardTypeSchema } from '../../../../lib/validation/cardTypeSchema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getData, sendPayload } from '../../../../lib/utils/SendRequestes';
import { toast } from 'sonner';
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';

interface IProps {
  close?: () => void;
  update?: boolean;
  id?: string | number;
}

const AddCardType: FC<IProps> = ({ close, update, id }) => {
  const endpoint = update
    ? `/bank/api/v1/bankCards/${id}`
    : '/bank/api/v1/bankCards';

  const {
    i18n: { language }
  } = useTranslation();
  const { data: cardType, isLoading } = useQuery({
    queryKey: ['cardType', id, language],
    queryFn: () => getData(endpoint),
    enabled: !!update && !!id
  });

  const formObject: FieldValues = {
    mode: 'all',
    resolver: yupResolver(getCardTypeSchema(update))
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue
    // reset
  } = useForm(formObject);

  useEffect(() => {
    if (cardType?.data) {
      setValue('name_ar', cardType?.data.lang_name.ar);
      setValue('name_en', cardType?.data.lang_name.en);
      setValue('is_max', cardType?.data.is_max);
    }
  }, [setValue, cardType?.data]);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => sendPayload(endpoint, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['bank/api/v1/bankCards']
      });
      toast.success(data.message);
      if (close) {
        close();
      }
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    // reset();
    // if (close) {
    //   close();
    // }

    const formData = new FormData();

    formData.append('name[en]', data.name_en);
    formData.append('name[ar]', data.name_ar);
    formData.append('is_max', data.is_max);

    if (data.file) {
      formData.append('media[0]', data.file);
    }
    if (update) {
      formData.append('_method', 'PUT');
    }
    mutate(formData);
  };
  return (
    <>
      <Spin spinning={isPending || isLoading} size="large">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <FormInput
            label="name"
            name="name_ar"
            lang="ar"
            control={control}
            errors={errors}
          />
          <FormInput
            label="name"
            name="name_en"
            lang="en"
            control={control}
            errors={errors}
          />
          <div className="md:col-span-2">
            <FormInput
              label="max"
              type="number"
              placeholder="max"
              name="is_max"
              control={control}
              errors={errors}
            />
          </div>
          <div className="md:col-span-2">
            <ImageUploader
              control={control}
              name="file"
              errors={errors}
              label="cardType"
              editable
              key={cardType?.data?.media}
              defaultValue={update && cardType?.data?.media}
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button title="save" />
          </div>
        </form>
      </Spin>
    </>
  );
};

export default AddCardType;
