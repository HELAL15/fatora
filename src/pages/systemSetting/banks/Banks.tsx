import { TableColumnsType } from 'antd';
import Heading from '../../../components/common/Heading';
import Table from '../../../components/common/Table';
import { useTranslation } from 'react-i18next';
import { FieldValues } from 'react-hook-form';
import DashboardModal from '../../../components/ui/DashboardModal';
import DeleteAction from '../../../components/common/actions/DeleteAction';
import AddBank from '../../../components/common/banks/bankTypes/AddBank';
import ImageViewerTable from '../../../components/common/ImageViewerTable';

const Banks = () => {
  const { t } = useTranslation();
  const title = 'bank.bank';
  const getMenu = (id: string, record: FieldValues) => [
    {
      key: '2',
      label: (
        <DashboardModal id={id} responsive modalTitle={title} title="edit">
          <AddBank update id={id} />
        </DashboardModal>
      ),
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
      ),
    },
  ];

  const columns: TableColumnsType = [
    {
      title: t('table.bankName'),
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: t('table.bankImg'),
      dataIndex: 'media',
      align: 'center',
      render: (media) => {
        const url = media[0]?.original_url;

        return <ImageViewerTable src={url} />;
      },
    },
  ];

  return (
    <>
      <Heading
        title="banks"
        hasBack
        body={
          <DashboardModal inTable responsive title="add" modalTitle={title}>
            <AddBank />
          </DashboardModal>
        }
      />
      <Table cols={columns} getMenu={getMenu} endPoint="bank/api/v1/banks" />
    </>
  );
};

export default Banks;
