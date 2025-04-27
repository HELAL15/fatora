import { TableColumnsType } from 'antd';
import Heading from '../../../components/common/Heading';
import Table from '../../../components/common/Table';
import { useTranslation } from 'react-i18next';
import { FieldValues } from 'react-hook-form';
import DashboardModal from '../../../components/ui/DashboardModal';
import DeleteAction from '../../../components/common/actions/DeleteAction';
import AddBank from '../../../components/common/banks/bankTypes/AddBank';

const Banks = () => {
  const { t } = useTranslation();
  const title = 'bank.bank';
  const getMenu = (id: string, record: FieldValues) => [
    {
      key: '2',
      label: (
        <DashboardModal id={id} responsive modalTitle={title} title="edit">
          <AddBank />
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
        title="banks"
        hasBack
        body={
          <DashboardModal inTable responsive title="add" modalTitle="bank.bank">
            <AddBank />
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

export default Banks;
