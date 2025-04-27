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
  const title = 'bank.accounts';
  const getMenu = (id: string, record: FieldValues) => [
    {
      key: '2',
      label: (
        <DashboardModal id={id} responsive modalTitle={title} title="edit">
          <AddBankAccount />
        </DashboardModal>
      )
    },
    {
      key: '3',
      label: (
        <DashboardModal id={id} modalTitle={title} title="delete">
          <DeleteAction
            id={id}
            endPoint="education-levels"
            title="level"
            record={record}
          />
        </DashboardModal>
      )
    }
  ];

  const columns: TableColumnsType = [
    {
      title: t('table.bankName'),
      dataIndex: 'product',
      align: 'center'
    },
    {
      title: t('table.bankImg'),
      dataIndex: 'quantity',
      align: 'center'
    }
  ];

  const data = [
    {
      id: 1,
      product: 'dummy data',
      quantity: 200
    },
    {
      id: 2,
      product: 'dummy data',
      quantity: 200
    }
  ];

  return (
    <>
      <Heading
        title="bankAccounts"
        hasBack
        body={
          <DashboardModal
            inTable
            responsive
            title="add"
            modalTitle="bank.accounts"
          >
            <AddBankAccount />
          </DashboardModal>
        }
      />
      <Table
        cols={columns}
        getMenu={getMenu}
        hasSperateData={true}
        sperateData={data}
      />
    </>
  );
};

export default BankAccounts;
