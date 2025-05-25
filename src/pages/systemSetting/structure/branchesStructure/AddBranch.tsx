import { FieldValues, useForm } from 'react-hook-form';
import Heading from '../../../../components/common/Heading';
import SectionWithContainer from '../../../../components/common/SectionWithContainer';
import Wrapper from '../../../../components/common/Wrapper';
import AddBranchForm from '../../../../components/structure/branches/AddBranchForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { getBranchSchema } from '../../../../validation/getBranchSchema';

const AddBranch = () => {
  const formObject: FieldValues = {
    mode: 'all',
    resolver: yupResolver(getBranchSchema()),
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm(formObject);

  const onSubmit = (data: FieldValues) => {
    const { nameEn, nameAr, ...rest } = data;
    const payload = {
      name: {
        en: nameEn,
        ar: nameAr,
      },
      ...rest,
    };
    console.log('payload', payload);
  };

  return (
    <>
      <Heading title="addBranch" hasBack />
      <SectionWithContainer>
        <Wrapper>
          <AddBranchForm
            control={control}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
          />
        </Wrapper>
      </SectionWithContainer>
    </>
  );
};

export default AddBranch;
