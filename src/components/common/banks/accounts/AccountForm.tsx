import { FC } from 'react';
import Button from '../../../ui/Button';
import FormInput from '../../FormInput';
import FormSelect from '../../FormSelect';
import { Control, FieldErrors } from 'react-hook-form';

interface IProps {
  submit: () => void;
  accountInfo: string | number;
  select: {
    id: string | number;
    name: string;
  }[];
  control: Control;
  errors: FieldErrors;
  banksLoading?: boolean;
}

const AccountForm: FC<IProps> = ({
  submit,
  accountInfo,
  select = [],
  control,
  errors,
  banksLoading
}) => {
  return (
    <>
      <form
        onSubmit={submit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div className=" col-span-1 md:col-span-2 lg:col-span-3">
          <FormSelect
            disabled={banksLoading}
            label="bank"
            defaultVal={accountInfo}
            placeholder="bank"
            data={select}
            name="bank_id"
            control={control}
            errors={errors}
          />
        </div>

        <FormInput
          label="accountNumber"
          placeholder="accountNumber"
          name="account_number"
          type="number"
          control={control}
          errors={errors}
        />
        <FormInput
          label="ibanNumber"
          placeholder="ibanNumber"
          name="iban_number"
          type="number"
          control={control}
          errors={errors}
        />
        <FormInput
          label="swiftNumber"
          placeholder="swiftNumber"
          name="swift_number"
          type="number"
          control={control}
          errors={errors}
        />

        <div className="md:col-span-2 lg:col-span-3 flex justify-end">
          <Button title="save" />
        </div>
      </form>
    </>
  );
};

export default AccountForm;
