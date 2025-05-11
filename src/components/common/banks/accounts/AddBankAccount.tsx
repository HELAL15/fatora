import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import { getAddBankAccountSchema } from '../../../../lib/validation/addBankAccountSchema';
import usePost from '../../../../hooks/usePost';
import { Spin } from 'antd';
import useFetch from '../../../../hooks/useFetch';
import AccountForm from './AccountForm';

interface IProps {
  close?: () => void;
  update?: boolean;
  id?: string;
}

const AddBankAccount: FC<IProps> = ({ update, id, close }) => {
  const endpoint = update
    ? `bank/api/v1/bankAccounts/${id}`
    : 'bank/api/v1/bankAccounts';

  const { data: accountInfo, isLoading } = useFetch({
    endpoint,
    keys: ['account', id ?? ''],
    enabled: !!update && !!id
  });

  const { data: banks, isLoading: banksLoading } = useFetch({
    endpoint: 'bank/api/v1/list',
    keys: ['banksList']
  });

  console.log(banks?.data);

  const formObject: FieldValues = {
    mode: 'all',
    resolver: yupResolver(getAddBankAccountSchema())
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue
    // reset
  } = useForm(formObject);

  useEffect(() => {
    if (accountInfo?.data) {
      console.log(accountInfo?.data.bank_id);

      setValue('bank_id', accountInfo?.data.bank_id);
      setValue('account_number', accountInfo?.data.account_number);
      setValue('iban_number', accountInfo?.data.iban_number);
      setValue('swift_number', accountInfo?.data.swift_number);
    }
  }, [setValue, accountInfo?.data]);

  const { mutate, isPending } = usePost({
    endpoint,
    revalid: ['bank/api/v1/bankAccounts'],
    onSuccess: () => {
      if (close) {
        close();
      }
    }
  });

  const onSubmit = (data: FieldValues) => {
    const payload = update ? { ...data, _method: 'PUT' } : data;

    mutate(payload as FormData);
  };

  return (
    <>
      <Spin size="large" spinning={isPending || isLoading}>
        <AccountForm
          control={control}
          errors={errors}
          select={banks?.data}
          banksLoading={banksLoading}
          accountInfo={accountInfo?.data?.bank_id}
          submit={handleSubmit(onSubmit)}
        />
      </Spin>
    </>
  );
};

export default AddBankAccount;
