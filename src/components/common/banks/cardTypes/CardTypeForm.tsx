import { Control, FieldErrors } from 'react-hook-form';
import FormInput from '../../FormInput';
import { FC } from 'react';
import ImageUploader from '../../ImageUploader';
import Button from '../../../ui/Button';

interface IProps {
  control: Control;
  errors: FieldErrors;
  update?: boolean;
  keyV: string;
  submit: () => void;
}

const CardTypeForm: FC<IProps> = ({
  control,
  errors,
  keyV = '',
  update,
  submit
}) => {
  return (
    <>
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            key={keyV}
            defaultValue={update ? keyV : undefined}
          />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <Button title="save" />
        </div>
      </form>
    </>
  );
};

export default CardTypeForm;
