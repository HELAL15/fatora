import { FC } from 'react';
import { Spin } from 'antd';
import BankForm from './BankForm';
import useAddBank from '../../../../services/bankType.service';

interface IProps {
  close?: () => void;
  update?: boolean;
  id?: string | number;
}

const AddBank: FC<IProps> = ({ close, update, id }) => {
  const {
    control,
    errors,
    isLoading,
    isPending,
    handleSubmit,
    onSubmit,
    bankMediaKey,
  } = useAddBank({ update, id, close });

  return (
    <>
      <Spin size="large" spinning={isPending || isLoading}>
        <BankForm
          control={control}
          errors={errors}
          keyV={bankMediaKey}
          key={bankMediaKey}
          update={update}
          submit={handleSubmit(onSubmit)}
        />
      </Spin>
    </>
  );
};

export default AddBank;
