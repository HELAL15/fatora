import { FieldValues, useForm } from 'react-hook-form';
import FormInput from '../../../../components/common/FormInput';
import SectionWithContainer from '../../../../components/common/SectionWithContainer';
import Wrapper from '../../../../components/common/Wrapper';
import Button from '../../../../components/ui/Button';

const AddZakat = () => {
  const { control, handleSubmit } = useForm({
    mode: 'all'
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <>
      <SectionWithContainer>
        <Wrapper>
          <form
            action=""
            className=" flex flex-col items-end gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FormInput
                label="temporaryPassword"
                name="temporaryPassword"
                control={control}
              />
              <FormInput label="email" name="email" control={control} />
              <FormInput
                label="commonName"
                name="commonName"
                control={control}
              />
              <FormInput
                label="organizerUnit"
                name="organizerUnit"
                control={control}
              />
              <FormInput
                label="organizingName"
                name="organizingName"
                control={control}
              />
              <FormInput label="tax" name="tax" control={control} />
              <FormInput
                label="registeredAddress"
                name="registeredAddress"
                control={control}
              />
              <FormInput
                label="supplyActivities"
                name="supplyActivities"
                control={control}
              />
              <FormInput
                label="serialNumber"
                name="serialNumber"
                control={control}
              />
              <FormInput
                label="registrationNumber"
                name="registrationNumber"
                control={control}
              />
            </div>
            <Button title="save" />
          </form>
        </Wrapper>
      </SectionWithContainer>
    </>
  );
};

export default AddZakat;
