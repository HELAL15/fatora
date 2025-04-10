import { TableColumnsType } from 'antd';
import invoiceLogo from '../../../assets/logo-invoice.png';
import Table from '../../../components/common/Table';
import TitleInfo from '../../../components/common/TitleInfo';
import BankTypePrice from '../../../components/ui/BankTypePrice';
import InvoicePaymentMethodsData from '../../../lib/data/InvoicePaymentMethodsData';

const Invoice = () => {
  const methods = InvoicePaymentMethodsData.map((method) => {
    const { id, img, price } = method;
    return <BankTypePrice key={id} img={img} price={price} />;
  });

  const columns: TableColumnsType = [
    {
      title: 'المنتج',
      dataIndex: 'product',
      align: 'center',
      responsive: ['xs', 'sm', 'md', 'lg']
    },
    {
      title: 'الكمية',
      dataIndex: 'quantity',
      align: 'center',
      responsive: ['xs', 'sm', 'md', 'lg']
    }
  ];

  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="bg-white pt-8  rounded-lg space-y-6">
            <div className="flex items-start justify-between flex-wrap mx-10 gap-4 rounded-2xl border-2 border-light px-12 py-10">
              <img
                className="object-contain max-md:flex-grow max-md:w-full md:max-w-[250px]  "
                src={invoiceLogo}
                alt="invoice logo"
                loading="lazy"
                draggable="false"
              />
              <div className="invoice-name space-y-2 text-center">
                <h1 className="text-primary font-bold text-2xl">
                  فاتورة ضريبية مبسطة
                </h1>
                <p className="invoice-date flex items-center justify-center gap-1 ">
                  <span className="font-bold">رقم الفاتورة : </span>
                  <span>24</span>
                </p>
              </div>
              <div className="date space-y-2">
                <p className="invoice-date flex items-center gap-1">
                  <span className="font-bold">تاريخ الفاتورة : </span>
                  <span> 2025-01-09</span>
                </p>
                <p className="invoice-date flex items-center gap-1">
                  <span className="font-bold"> اسم العميل : </span>
                  <span>احمد هلال</span>
                </p>
                <p className="invoice-date flex items-center gap-1">
                  <span className="font-bold"> رقم الجوال : </span>
                  <span>01222810589</span>
                </p>
              </div>
            </div>
            <Table cols={columns} />
            <div className="sub-info flex items-center justify-between mx-10 flex-wrap gap-4  px-8 py-10">
              <div className="seller-name text-center ">
                <p className="text-sm">اسم البائع</p>
                <p className="font-bold text-lg">احمد هلال</p>
              </div>
              <div className="qr-code size-28 bg-primary"></div>
              <div className="methods flex items-center gap-4">{methods}</div>
            </div>
            <div className="congrats relative py-3 px-4 border-3 mx-10 border-light rounded-xl">
              <p className="font-bold bg-light rounded-lg px-8 py-2 text-center">
                كل عام وانتم بخير
              </p>
              {/* white space top */}
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-[10px] bg-white z-20 rounded-b-full" />

              {/* white space bottom */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-[10px] bg-white z-20 rounded-t-full" />
            </div>

            <div className="bg-primary text-white py-5 px-4 grid place-items-center w-full  ">
              <div className="w-[850px] mx-auto grid grid-cols-2 lg:grid-cols-3 justify-items-center place-content-center gap-4">
                <TitleInfo title="العنوان" desc="الرياض , السعودية" />
                <TitleInfo title="الإيميل" desc="1ahmedhelal1@gmail.com" />
                <TitleInfo title="الرقم الضريبي" desc="45673" />
                <TitleInfo title="رقم المحل" desc="34566" />
                <TitleInfo title="س.ت" desc="5345345" />
                <TitleInfo title="الهاتف" desc="23432" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Invoice;
