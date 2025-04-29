import { FieldValues, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Table, Tooltip } from 'antd';
import FormInput from '../../../components/common/FormInput';
import FormSelect from '../../../components/common/FormSelect';
import Heading from '../../../components/common/Heading';
import SectionWithContainer from '../../../components/common/SectionWithContainer';
import Wrapper from '../../../components/common/Wrapper';
import InfoCard from '../../../components/ui/InfoCard';
import { useTranslation } from 'react-i18next';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Button from '../../../components/ui/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  getAddSellingInvoiceClientSchema,
  getAddSellingInvoiceSchema
} from '../../../lib/validation/addSellingInvoiceSchema';
import { toast } from 'sonner';

interface TableItem {
  key: string;
  number: string;
  category: string;
  item: string;
  cost: string;
  price: string;
  total: string;
}

const AddSellingInvoice = () => {
  const { t } = useTranslation();
  const [tableData, setTableData] = useState<TableItem[]>([]);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const defaultTableValues = {
    number: '',
    category: '',
    item: '',
    cost: '',
    price: '',
    total: ''
  };

  const defaultClientValues = {
    clientName: '',
    date: ''
  };
  const totalBills = tableData.reduce(
    (sum, item) => sum + Number(item.cost),
    0
  );
  const totalVats = tableData.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );
  const totalValues = tableData.reduce(
    (sum, item) => sum + Number(item.total),
    0
  );
  const tableItemsCount = tableData.length;
  const totalInvoice = [
    { id: 1, title: t('billValue'), desc: `${totalBills} ${t('SAR')}` },
    { id: 2, title: t('price'), desc: `${totalVats} ${t('SAR')}` },
    { id: 3, title: t('totalValue'), desc: `${totalValues} ${t('SAR')}` },
    { id: 4, title: t('count'), desc: `${tableItemsCount} ${t('SAR')}` }
  ];

  const clients = [{ id: '1', name: 'ahmed helal' }];

  const mappedTotals = totalInvoice.map((item: FieldValues) => (
    <InfoCard key={item.id} title={item.title} desc={item.desc} />
  ));

  const {
    control: clientControl,
    handleSubmit: handleClientSubmit,
    formState: { errors: clientErrors }
  } = useForm({
    mode: 'onSubmit',
    defaultValues: defaultClientValues,
    resolver: yupResolver(getAddSellingInvoiceClientSchema())
  });

  const {
    control: tableControl,
    handleSubmit: handleTableSubmit,
    reset: resetTable,
    formState: { errors: tableErrors }
  } = useForm({
    mode: 'onSubmit',
    defaultValues: defaultTableValues,
    resolver: yupResolver(getAddSellingInvoiceSchema())
  });

  const onAddRow = (data: TableItem) => {
    const newItem = {
      ...data,
      key: editingRow || tableData.length.toString()
    };

    if (editingRow !== null) {
      setTableData((prev) =>
        prev.map((item) => (item.key === editingRow ? newItem : item))
      );
      setEditingRow(null);
    } else {
      setTableData((prev) => [...prev, newItem]);
    }
    resetTable(defaultTableValues);
  };

  const handleEdit = (key: string) => {
    const row = tableData.find((item) => item.key === key);
    if (row) {
      resetTable(row);
      setEditingRow(key);
    }
  };

  const handleDelete = (key: string) => {
    setTableData((prev) => prev.filter((item) => item.key !== key));
    resetTable(defaultTableValues);
    setEditingRow(null);
  };

  const onSubmitAll = (clientData: FieldValues) => {
    if (tableData.length === 0) return;

    const finalData = {
      client: clientData,
      items: tableData,
      totals: {
        billValue: totalBills,
        vat: totalVats,
        totalValue: totalValues,
        count: tableItemsCount
      }
    };

    console.log('Final Data:', finalData);
    toast.success(
      `invoice added successfully , client id : #${clientData.clientName} `
    );
  };

  const inputRow = (
    <tr key="input-row">
      <td>
        <FormInput
          name="number"
          label="number"
          hasLabel={false}
          control={tableControl}
          errors={tableErrors}
        />
      </td>
      <td>
        <FormInput
          name="category"
          label="category"
          hasLabel={false}
          control={tableControl}
          errors={tableErrors}
        />
      </td>
      <td>
        <FormInput
          name="item"
          label="item"
          hasLabel={false}
          control={tableControl}
          errors={tableErrors}
        />
      </td>
      <td>
        <FormInput
          name="cost"
          label="cost"
          hasLabel={false}
          control={tableControl}
          errors={tableErrors}
          type="number"
        />
      </td>
      <td>
        <FormInput
          name="price"
          label="price"
          hasLabel={false}
          control={tableControl}
          errors={tableErrors}
          type="number"
        />
      </td>
      <td>
        <FormInput
          name="total"
          label="total"
          hasLabel={false}
          control={tableControl}
          errors={tableErrors}
          type="number"
        />
      </td>
      <td>
        <div className="w-full flex items-center justify-center">
          <Button
            icon={
              <Tooltip title={editingRow !== null ? t('update') : t('add')}>
                {editingRow !== null ? <FaEdit /> : <FaPlus />}
              </Tooltip>
            }
            onClick={handleTableSubmit((data) => onAddRow(data as TableItem))}
          />
        </div>
      </td>
    </tr>
  );

  const columns = [
    {
      title: t('table.itemNumber'),
      dataIndex: 'number',
      align: 'center' as const
    },
    {
      title: t('table.category'),
      dataIndex: 'category',
      align: 'center' as const
    },
    {
      title: t('table.item'),
      dataIndex: 'item',
      align: 'center' as const
    },
    {
      title: t('table.cost'),
      dataIndex: 'cost',
      align: 'center' as const
    },
    {
      title: t('table.price'),
      dataIndex: 'price',
      align: 'center' as const
    },
    {
      title: t('table.total'),
      dataIndex: 'total',
      align: 'center' as const
    },
    {
      title: t('table.action'),
      dataIndex: 'actions',
      align: 'center' as const,
      render: (_: unknown, record: TableItem) => (
        <div className="flex justify-center items-center gap-2">
          <Button icon={<FaEdit />} onClick={() => handleEdit(record.key)} />
          <Button icon={<FaTrash />} onClick={() => handleDelete(record.key)} />
        </div>
      )
    }
  ];

  return (
    <>
      <Heading title="selling" hasBack />
      <SectionWithContainer>
        <form onSubmit={handleClientSubmit(onSubmitAll)}>
          <Wrapper cx="!bg-secondary/20  space-y-6">
            <Wrapper cx="!space-y-8 !bg-white">
              <div className="flex items-center gap-10">
                <h2>
                  <span className="font-semibold">رقم الفاتورة - </span>
                  <span>123</span>
                </h2>
                <span className="text-xs rounded-rounded text-center bg-primary text-white px-2 py-1">
                  السعر لا يشمل الضريبة
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                <FormSelect
                  name="clientName"
                  placeholder="fffffffffffffffff"
                  label="clientName"
                  data={clients}
                  control={clientControl}
                  errors={clientErrors}
                />
                <FormInput
                  name="date"
                  type="date"
                  label={'date'}
                  control={clientControl}
                  errors={clientErrors}
                />
              </div>
            </Wrapper>

            <Wrapper cx="!bg-white">
              <h4 className="font-bold mb-4">ابحث برقم المنتج</h4>
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={false}
                loading={{
                  spinning: false,
                  size: 'large'
                }}
                scroll={{ x: 'max-content' }}
                bordered
                size="small"
                components={{
                  body: {
                    wrapper: ({ children, ...rest }) => (
                      <tbody {...rest}>
                        {inputRow}
                        {children}
                      </tbody>
                    )
                  }
                }}
              />
            </Wrapper>

            <Wrapper cx="!bg-white">
              <h4 className="font-bold mb-4">إجمالي الفاتورة</h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {mappedTotals}
              </div>
            </Wrapper>

            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                title="continue"
                disabled={tableData.length === 0}
              />
            </div>
          </Wrapper>
        </form>
      </SectionWithContainer>
    </>
  );
};

export default AddSellingInvoice;
