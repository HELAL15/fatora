import { FieldValues, useForm } from 'react-hook-form';
import FormInput from '../../FormInput';
import ImageUploader from '../../ImageUploader';
import Button from '../../../ui/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { getCardTypeSchema } from '../../../../lib/validation/cardTypeSchema';

interface IProps {
  close?: () => void;
}

const AddCardType: FC<IProps> = ({ close }) => {
  const formObject: FieldValues = {
    mode: 'all',
    resolver: yupResolver(getCardTypeSchema())
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
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <FormInput
          label="typeName"
          placeholder="typeName"
          name="type_ar"
          lang="ar"
          control={control}
          errors={errors}
        />
        <FormInput
          label="typeName"
          placeholder="typeName"
          name="type_en"
          lang="en"
          control={control}
          errors={errors}
        />
        <div className="md:col-span-2">
          <ImageUploader
            control={control}
            name="file"
            errors={errors}
            label="cardType"
          />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <Button title="save" />
        </div>
      </form>
    </>
  );
};

export default AddCardType;
