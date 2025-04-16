import { Controller, FieldValues, useForm } from 'react-hook-form';
import FormInput from '../../../../components/common/FormInput';
import SectionWithContainer from '../../../../components/common/SectionWithContainer';
import Wrapper from '../../../../components/common/Wrapper';
import Button from '../../../../components/ui/Button';
import Heading from '../../../../components/common/Heading';
import { Radio } from 'antd';
import { IoBan } from 'react-icons/io5';

import { yupResolver } from '@hookform/resolvers/yup';
import { getAddZakatSchema } from '../../../../validation/addZakatSchema';

const AddZakat = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    defaultValues: {
      invoiceType: 'testing',
      temporaryPassword: '',
      email: '',
      commonName: '',
      organizerUnit: '',
      organizingName: '',
      tax: '',
      registeredAddress: '',
      supplyActivities: '',
      serialNumber: '',
      registrationNumber: ''
    },
    resolver: yupResolver(getAddZakatSchema())
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <>
      <Heading title="zakat" hasBack={true} />
      <SectionWithContainer>
        <Wrapper>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center justify-between gap-4  col-span-1 md:col-span-2 lg:col-span-3">
                <Controller
                  name="invoiceType"
                  control={control}
                  rules={{ required: 'Please select a gender' }}
                  render={({ field }) => (
                    <Radio.Group {...field}>
                      <Radio value="testing">testing</Radio>
                      <Radio value="live">live</Radio>
                    </Radio.Group>
                  )}
                />
                <Button
                  title="disable"
                  type="button"
                  icon={<IoBan className="text-lg" />}
                  cx="!bg-red-500/30 !text-red-500 hover:!bg-red-500 hover:!text-white flex items-center gap-2"
                />
              </div>
              <FormInput
                errors={errors}
                label="temporaryPassword"
                name="temporaryPassword"
                control={control}
                type="number"
                hint="234566"
              />
              <FormInput
                errors={errors}
                label="email"
                name="email"
                control={control}
                type="email"
                hint="email@gmail.com"
              />
              <FormInput
                errors={errors}
                label="commonName"
                name="commonName"
                control={control}
                hint='name "example"'
              />
              <FormInput
                errors={errors}
                label="organizerUnit"
                name="organizerUnit"
                control={control}
                hint="name "
              />
              <FormInput
                errors={errors}
                label="organizingName"
                name="organizingName"
                control={control}
                hint="name "
              />
              <FormInput
                errors={errors}
                label="tax"
                name="tax"
                control={control}
                type="number"
                hint="2135243643"
              />
              <FormInput
                errors={errors}
                label="registeredAddress"
                name="registeredAddress"
                control={control}
                hint="القاهرة الجمالية"
              />
              <FormInput
                errors={errors}
                label="supplyActivities"
                name="supplyActivities"
                control={control}
                hint="name "
              />
              <FormInput
                errors={errors}
                label="serialNumber"
                name="serialNumber"
                control={control}
                hint="fg53454th "
              />
              <FormInput
                errors={errors}
                label="registrationNumber"
                name="registrationNumber"
                control={control}
                hint="566777 "
              />
              <div className="flex items-end justify-end col-span-1 md:col-span-2 lg:col-span-3">
                <Button title="save" cx="" />
              </div>
            </div>
          </form>
        </Wrapper>
      </SectionWithContainer>
    </>
  );
};

export default AddZakat;
