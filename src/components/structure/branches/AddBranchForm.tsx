import { Control, FieldErrors, FieldValues } from 'react-hook-form';
import FormInput from '../../common/FormInput';
import Button from '../../ui/Button';

interface IProps {
  control: Control<FieldValues>;
  errors: FieldErrors;
  onSubmit: () => void;
}

const AddBranchForm = ({ control, errors, onSubmit }: IProps) => {
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6"
      >
        <FormInput
          name="nameEn"
          label="name"
          placeholder="name"
          lang="en"
          control={control}
          errors={errors}
        />
        <FormInput
          name="nameAr"
          label="name"
          placeholder="name"
          lang="ar"
          control={control}
          errors={errors}
        />
        <FormInput
          name="phone"
          label="phone"
          placeholder="phone"
          control={control}
          errors={errors}
        />
        <FormInput
          name="branch_number"
          label="branch_number"
          placeholder="branch_number"
          control={control}
          errors={errors}
        />
        <FormInput
          name="market_number"
          label="market_number"
          placeholder="market_number"
          control={control}
          errors={errors}
        />
        <FormInput
          name="address"
          label="address"
          placeholder="address"
          control={control}
          errors={errors}
        />
        <FormInput
          name="fax"
          label="fax"
          placeholder="fax"
          control={control}
          errors={errors}
        />
        <FormInput
          name="commercial_register"
          label="commercial_register"
          placeholder="commercial_register"
          control={control}
          errors={errors}
        />
        <FormInput
          name="zakah_name"
          label="zakah_name"
          placeholder="zakah_name"
          control={control}
          errors={errors}
        />

        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-end">
          <Button title="save" />
        </div>
      </form>
    </>
  );
};

export default AddBranchForm;
