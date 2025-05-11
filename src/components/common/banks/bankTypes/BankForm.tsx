import { FC, memo } from 'react';
import ImageUploader from '../../ImageUploader';
import Button from '../../../ui/Button';
import FormInput from '../../FormInput';
import { Control, FieldErrors } from 'react-hook-form';

interface IProps {
  control: Control;
  errors: FieldErrors;
  keyV: string;
  submit: () => void;
  update?: boolean;
}

const BankForm: FC<IProps> = ({ submit, control, errors, keyV, update }) => {
  return (
    <>
      <form
        action=""
        onSubmit={submit}
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
            key={keyV}
            defaultValue={update ? keyV : undefined}
          />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <Button title="confirm" />
        </div>
      </form>
    </>
  );
};

export default memo(BankForm);
