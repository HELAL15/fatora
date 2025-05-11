import { TableColumnsType } from 'antd';
import Heading from '../../../components/common/Heading';
import Table from '../../../components/common/Table';
import { useTranslation } from 'react-i18next';
import { FieldValues } from 'react-hook-form';
import DashboardModal from '../../../components/ui/DashboardModal';
import DeleteAction from '../../../components/common/actions/DeleteAction';
import AddBankAccount from '../../../components/common/banks/accounts/AddBankAccount';

const BankAccounts = () => {
  const { t } = useTranslation();
  const getMenu = (id: string, record: FieldValues) => [
    {
      key: '2',
      label: (
        <DashboardModal id={id} responsive title="edit">
          <AddBankAccount update id={id} />
        </DashboardModal>
      )
    },
    {
      key: '3',
      label: (
        <DashboardModal id={id} title="delete">
          <DeleteAction
            id={id}
            endPoint="bank/api/v1/bankAccounts"
            record={record}
          />
        </DashboardModal>
      )
    }
  ];

  const columns: TableColumnsType = [
    {
      title: t('table.bankName'),
      dataIndex: 'bank_name',
      align: 'center'
    },
    {
      title: t('table.accountNumber'),
      dataIndex: 'account_number',
      align: 'center'
    },
    {
      title: t('table.ibanNumber'),
      dataIndex: 'iban_number',
      align: 'center'
    },
    {
      title: t('table.swiftNumber'),
      dataIndex: 'swift_number',
      align: 'center'
    }
  ];

  return (
    <>
      <Heading
        title="bankAccounts"
        hasBack
        body={
          <DashboardModal inTable responsive title="add">
            <AddBankAccount />
          </DashboardModal>
        }
      />
      <Table
        cols={columns}
        getMenu={getMenu}
        endPoint="bank/api/v1/bankAccounts"
      />
    </>
  );
};

export default BankAccounts;
