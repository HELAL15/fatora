import { useTranslation } from 'react-i18next';
import Heading from '../../../../components/common/Heading';
import Table from '../../../../components/common/Table';
import { FieldValues } from 'react-hook-form';
import { Link } from 'react-router';
import DashboardModal from '../../../../components/ui/DashboardModal';
import DeleteAction from '../../../../components/common/actions/DeleteAction';
import { TableColumnsType } from 'antd';

const Branches = () => {
  const { t } = useTranslation();
  const title = 'bank.bank';
  const getMenu = (id: string, record: FieldValues) => [
    {
      key: '1',
      label: <Link to={`/${id}`}>{t('view')}</Link>
    },
    {
      key: '1',
      label: <Link to={`/${id}/update`}>{t('edit')}</Link>
    },
    {
      key: '3',
      label: (
        <DashboardModal id={id} modalTitle={title} title="delete">
          <DeleteAction
            id={id}
            endPoint="bank/api/v1/banks"
            title="bank"
            record={record}
          />
        </DashboardModal>
      )
    }
  ];

  const columns: TableColumnsType = [
    {
      title: t('table.bankName'),
      dataIndex: 'name',
      align: 'center'
    }
  ];

  return (
    <>
      <Heading title="branches" hasBack />
      <Table
        endPoint="branch/api/v1/branches"
        cols={columns}
        getMenu={getMenu}
      />
    </>
  );
};

export default Branches;
