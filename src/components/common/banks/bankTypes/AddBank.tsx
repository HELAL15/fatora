import { FieldValues, useForm } from 'react-hook-form';
import FormInput from '../../FormInput';
import ImageUploader from '../../ImageUploader';
import Button from '../../../ui/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { getAddBankSchema } from '../../../../lib/validation/addBankValidation';
import { FC, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getData, sendPayload } from '../../../../lib/utils/SendRequestes';
import { Spin } from 'antd';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface IProps {
  close?: () => void;
  update?: boolean;
  id?: string | number;
}

const AddBank: FC<IProps> = ({ close, update, id }) => {
  const endpoint = update ? `/bank/api/v1/banks/${id}` : '/bank/api/v1/banks';
  const {
    i18n: { language }
  } = useTranslation();
  const { data: bankInfo, isLoading } = useQuery({
    queryKey: ['bank', id, language],
    queryFn: () => getData(endpoint),
    enabled: !!update && !!id
  });

  const formObject: FieldValues = {
    mode: 'all',
    resolver: yupResolver(getAddBankSchema(update))
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm(formObject);

  useEffect(() => {
    if (bankInfo?.data) {
      setValue('bank_ar', bankInfo?.data.lang_name.ar);
      setValue('bank_en', bankInfo?.data.lang_name.en);
    }
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => sendPayload(endpoint, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['bank/api/v1/banks']
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
    const formData = new FormData();
    formData.append('name[ar]', data.bank_ar);
    formData.append('name[en]', data.bank_en);
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
      <Spin size="large" spinning={isPending || isLoading}>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <FormInput
            label="bankName"
            placeholder="bankName"
            name="bank_ar"
            lang="ar"
            control={control}
            errors={errors}
          />
          <FormInput
            label="bankName"
            placeholder="bankName"
            name="bank_en"
            lang="en"
            control={control}
            errors={errors}
          />
          <div className="md:col-span-2">
            <ImageUploader
              control={control}
              name="file"
              errors={errors}
              label="bank"
              editable
              key={bankInfo?.data?.media}
              defaultValue={update && bankInfo?.data?.media}
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button title="confirm" />
          </div>
        </form>
      </Spin>
    </>
  );
};

export default AddBank;
