import { useForm } from 'react-hook-form';
import FormSelect from '../../../components/common/FormSelect';
import Heading from '../../../components/common/Heading';
import SectionWithContainer from '../../../components/common/SectionWithContainer';
import Table from '../../../components/common/Table';
import Wrapper from '../../../components/common/Wrapper';
import InfoCard from '../../../components/ui/InfoCard';
import FormInput from '../../../components/common/FormInput';
import { useState } from 'react';
import { TableColumnsType } from 'antd';
import { useTranslation } from 'react-i18next';

const AddSellingInvoice = () => {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors }
  } = useForm({
    mode: 'all'
  });

  const [tableData, setTableData] = useState([
    { id: '0', name: 'dd', description: 'dfghj' }
  ]);

  const columns: TableColumnsType = [
    {
      title: t('table.bankName'),
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: t('table.bankImg'),
      dataIndex: 'description',
      align: 'center'
    },
    {
      title: t('table.bankName'),
      dataIndex: 'category',
      align: 'center'
    },
    {
      title: t('table.bankImg'),
      dataIndex: 'item',
      align: 'center'
    },
    {
      title: t('table.bankImg'),
      dataIndex: 'price',
      align: 'center'
    },
    {
      title: t('table.add'),
      dataIndex: 'action',
      align: 'center',
      render: (_, record, index) => {
        if (index === 0) {
          const r = record;
          console.log(r)
          return (
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() =>
                  setTableData((prev) => [
                    ...prev,
                    {
                      id: String(prev.length),
                      name: 'dd',
                      description: 'dfghj'
                    }
                  ])
                }
                className="bg-primary text-white px-2 py-1 rounded-rounded"
              >
                +
              </button>
            </div>
          );
        }
        return null; // Return null for other rows
      }
    }
  ];

  return (
    <>
      <Heading title="selling" hasBack />

      <SectionWithContainer>
        <Wrapper cx="!bg-secondary/20 !backdrop-blur-md !bg-opacity-30 space-y-6">
          <Wrapper cx="!space-y-8">
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
                placeholder="client"
                label="client"
                control={control}
                errors={errors}
              />
              <FormInput
                name="date"
                type="date"
                placeholder="date"
                label="date"
                control={control}
                errors={errors}
              />
            </div>
          </Wrapper>
          <Wrapper>
            <h4 className="font-bold mb-4">ابحث برقم المنتج</h4>
            <Table
              cols={columns}
              hasSperateData
              sperateData={tableData}
              hasContainer={false}
            />
          </Wrapper>
          <Wrapper>
            <h4 className=" font-bold mb-4">إجمالي الفاتورة</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 ">
              <InfoCard title="قيمة الفاتورة" desc="5 ر.س" />
              <InfoCard title="قيمة الفاتورة" desc="5 ر.س" />
              <InfoCard title="قيمة الفاتورة" desc="5 ر.س" />
              <InfoCard title="قيمة الفاتورة" desc="5 ر.س" />
              <InfoCard title="قيمة الفاتورة" desc="5 ر.س" />
              <InfoCard title="قيمة الفاتورة" desc="5 ر.س" />
            </div>
          </Wrapper>
        </Wrapper>
      </SectionWithContainer>
    </>
  );
};

export default AddSellingInvoice;
