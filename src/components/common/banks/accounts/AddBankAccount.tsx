import { FieldValues, useForm } from 'react-hook-form';
import FormInput from '../../FormInput';
import Button from '../../../ui/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import FormSelect from '../../FormSelect';
import { getAddBankAccountSchema } from '../../../../lib/validation/addBankAccountSchema';

interface IProps {
  close?: () => void;
}

const AddBankAccount: FC<IProps> = ({ close }) => {
  const formObject: FieldValues = {
    mode: 'all',
    resolver: yupResolver(getAddBankAccountSchema())
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <FormSelect
          label="country"
          placeholder="country"
          data={[]}
          name="country"
          control={control}
          errors={errors}
        />
        <FormSelect
          label="city"
          placeholder="city"
          data={[]}
          name="city"
          control={control}
          errors={errors}
        />
        <FormSelect
          label="purpose"
          placeholder="purpose"
          data={[]}
          name="purpose"
          control={control}
          errors={errors}
        />
        <FormSelect
          label="bank"
          placeholder="bank"
          data={[]}
          name="bank"
          control={control}
          errors={errors}
        />
        <FormSelect
          label="branch"
          placeholder="branch"
          data={[]}
          name="branch"
          control={control}
          errors={errors}
        />
        <FormInput
          label="accountNumber"
          placeholder="accountNumber"
          name="accountNumber"
          control={control}
          errors={errors}
        />
        <div className="md:col-span-2 lg:col-span-3 grid gap-4 grid-cols-1 md:grid-cols-2">
          <FormInput
            label="iban"
            placeholder="iban"
            name="iban"
            control={control}
            errors={errors}
          />
          <FormInput
            label="swift"
            placeholder="swift"
            name="swift"
            control={control}
            errors={errors}
          />
        </div>

        <div className="md:col-span-2 lg:col-span-3 flex justify-end">
          <Button title="save" />
        </div>
      </form>
    </>
  );
};

export default AddBankAccount;
