import { FieldValues, useForm } from 'react-hook-form';
import FormInput from '../../FormInput';
import ImageUploader from '../../ImageUploader';
import Button from '../../../ui/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { getAddBankSchema } from '../../../../validation/addBankValidation';
import { FC } from 'react';

interface IProps {
  close?: () => void;
}

const AddBank: FC<IProps> = ({ close }) => {
  const formObject: FieldValues = {
    mode: 'all',
    resolver: yupResolver(getAddBankSchema())
  };
  const {
    control,
    formState: { errors },
    handleSubmit
    // reset
  } = useForm(formObject);
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    // reset();
    if (close) {
      close();
    }
  };
  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
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
          <ImageUploader control={control} name="file" errors={errors} />
        </div>
        <div className="md:col-span-2 flex justify-end mt-8">
          <Button title="confirm" />
        </div>
      </form>
    </>
  );
};

export default AddBank;
