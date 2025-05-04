import { Drawer, TableColumnsType } from 'antd';
import invoiceLogo from '../../../assets/logo.png';
import Table from '../../../components/common/Table';
import TitleInfo from '../../../components/common/TitleInfo';
import BankTypePrice from '../../../components/ui/BankTypePrice';
import InvoicePaymentMethodsData from '../../../lib/data/InvoicePaymentMethodsData';
import SectionWithContainer from '../../../components/common/SectionWithContainer';
import Img from '../../../components/ui/Img';
import Button from '../../../components/ui/Button';
import useGoBack from '../../../lib/utils/GoBack';
import { useLayoutEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import FormInput from '../../../components/common/FormInput';
import ImageUploader from '../../../components/common/ImageUploader';
import { getImageSrc } from '../../../lib/utils/ImageSrc';
import ColorSelector from '../../../components/common/ColorSelector';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import Heading from '../../../components/common/Heading';
import { colorPrimary } from '../../../lib/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setInvoiceDesign } from '../../../store/features/designInvoiceSlice';
import { RootState } from '../../../store/store';
import { toBase64 } from '../../../lib/utils/toBase64';

const Invoice = () => {
  const { t } = useTranslation();
  const goBack = useGoBack();
  const dispatch = useDispatch();

  const { data: invoiceData } = useSelector(
    (state: RootState) => state.designInvoice || []
  );

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

  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'all',
    defaultValues: {
      img: '',
      name: 'فاتورة ضريبية مبسطة',
      primaryColor: colorPrimary
    }
  });
  useLayoutEffect(() => {
    if (invoiceData) {
      reset(invoiceData);
    }
  }, [invoiceData, reset]);
  const handleCancel = () => {
    onClose();
    reset();
  };

  const { name, img, primaryColor } = watch();

  const imageSrc =
    (invoiceData as { img?: { base64: string } })?.img?.base64 ||
    getImageSrc(img, invoiceLogo);

  // const imageSrc = getImageSrc(img, invoiceLogo);

  const onSubmit = async (data: FieldValues) => {
    const actualImageFile = data.img?.originFileObj || data.img;

    let base64Image = null;

    if (actualImageFile instanceof File) {
      base64Image = await toBase64(actualImageFile);
    }

    const invoiceDesignData = {
      name: data.name,
      primaryColor: data.primaryColor,
      img:
        actualImageFile instanceof Blob
          ? {
              name:
                actualImageFile instanceof File
                  ? actualImageFile.name
                  : 'uploaded-image',
              type: actualImageFile.type,
              size: actualImageFile.size,
              base64: base64Image
            }
          : data.img
    };

    const dataWithoutImg = {
      name: data.name,
      primaryColor: data.primaryColor
    };

    dispatch(setInvoiceDesign(data?.img ? invoiceDesignData : dataWithoutImg));
    onClose();
  };

  return (
    <>
      <Drawer title={t('button.editInvoice')} onClose={onClose} open={open}>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col justify-between"
        >
          <div className="space-y-8">
            <FormInput
              control={control}
              name="name"
              label="invoiceName"
              placeholder="invoiceName"
            />
            <ImageUploader
              label="invoiceLogo"
              name="img"
              defaultValue={imageSrc}
              isOpen
              control={control}
              errors={errors}
            />
            <ColorSelector
              name="primaryColor"
              control={control}
              errors={errors}
            />
          </div>
          <div className="w-full flex gap-2">
            <Button title="save" cx="!w-full flex-grow" />
            <Button
              type="button"
              title="cancel"
              onClick={handleCancel}
              outline
            />
          </div>
        </form>
      </Drawer>
      <Heading
        title="invoiceData"
        body={
          <>
            <div className="flex items-center gap-2">
              <Button type="button" title="editInvoice" onClick={onOpen} />
              <Button type="button" title="back" outline onClick={goBack} />
            </div>
          </>
        }
      />
      <SectionWithContainer>
        <div className="bg-white pt-8   rounded-lg space-y-6">
          <div className="flex items-center mx-4 md:mx-8 lg:mx-10 justify-center md:justify-between flex-wrap gap-6 md:gap-4 rounded-2xl border-2 border-light px-6 md:px-8 lg:px-12 py-10">
            <Img
              cx="object-contain max-md:flex-grow max-h-[100px] max-md:w-full md:max-w-[250px]"
              src={imageSrc}
              alt="invoice logo"
            />
            <div className="invoice-name space-y-2 text-center">
              <h2
                style={{
                  color: primaryColor
                }}
                className="text-primary font-bold text-2xl"
              >
                {name}
              </h2>
              <TitleInfo
                title="رقم الفاتورة"
                desc="24"
                cx="invoice-date  justify-center "
              />
            </div>
            <div className="date space-y-2">
              <TitleInfo title="تاريخ الفاتورة" desc="2025-01-09" />
              <TitleInfo title="اسم العميل" desc="احمد هلال" />
              <TitleInfo title="رقم الجوال" desc="01222810589" />
            </div>
          </div>
          <Table
            color={primaryColor}
            customClass="dynamic-color mx-4 md:mx-8 lg:mx-10"
            hasContainer={false}
            cols={columns}
            hasSperateData={true}
            sperateData={data}
            noPagination
          />
          <div className="sub-info mx-4 md:mx-8 lg:mx-10 flex items-center justify-between  flex-wrap gap-4  py-10">
            <div className="seller-name text-center max-md:w-full max-md:flex-grow ">
              <p className="text-sm">اسم البائع</p>
              <p className="font-bold text-lg">احمد هلال</p>
            </div>
            <div
              style={{
                background: primaryColor
              }}
              className="qr-code size-28 max-md:mx-auto "
            />
            <div className="methods flex items-center justify-center lg:justify-between flex-wrap gap-4">
              {methods}
            </div>
          </div>
          <div className="congrats mx-4 md:mx-8 lg:mx-10 relative py-3 px-4 border-3  border-light rounded-xl">
            <p className="font-bold bg-light rounded-lg px-8 py-2 text-center">
              كل عام وانتم بخير
            </p>
            {/* white space top */}
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-[10px] bg-white z-20 rounded-b-full" />

            {/* white space bottom */}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-[10px] bg-white z-20 rounded-t-full" />
          </div>

          <div
            style={{
              background: primaryColor
            }}
            className={clsx(
              ` text-white py-5 px-4 grid place-items-center w-full`
            )}
          >
            <div className="lg:w-[850px] lg:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center place-content-center gap-4">
              <TitleInfo title="العنوان" desc="الرياض , السعودية" />
              <TitleInfo title="الإيميل" desc="1ahmedhelal1@gmail.com" />
              <TitleInfo title="الرقم الضريبي" desc="45673" />
              <TitleInfo title="رقم المحل" desc="34566" />
              <TitleInfo title="س.ت" desc="5345345" />
              <TitleInfo title="الهاتف" desc="23432" />
            </div>
          </div>
        </div>
      </SectionWithContainer>
    </>
  );
};

export default Invoice;
