import Section from '../../components/common/Section';
import branchBg from '../../assets/branch.jpg';
import { TbCreditCardPay, TbTransactionDollar } from 'react-icons/tb';
import BranchHomeCard from '../../components/common/branch/BranchHomeCard';
import { useTranslation } from 'react-i18next';
import Button from '../../components/ui/Button';
import { FaArrowLeft } from 'react-icons/fa';
import useGoBack from '../../utils/helpers/GoBack';

const BranchHome = () => {
  const { t } = useTranslation();
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${branchBg})`,
        }}
        className=" min-h-screen max-md:pb-6 bg-cover bg-center"
      >
        <header className=" md:px-6  text-white sticky  max-md:mb-6">
          <div className="container-fluid">
            <div className="flex items-center justify-between gap-4 w-full">
              <div className="logo bg-primary px-4 py-8 rounded-ee-2xl rounded-es-2xl ">
                {t('fatora')}
              </div>
              <div className="info flex items-center gap-4">
                <p className="flex items-center flex-wrap gap-1">
                  <span>اهلا وسهلا بك</span>
                  <span className="font-bold">احمد هلال</span>
                  <span className="text-white font-bold bg-secondary rounded-rounded px-2 py-1">
                    فرح الصحاري
                  </span>
                </p>
                <Button icon={<FaArrowLeft />} onClick={useGoBack()} />
              </div>
            </div>
          </div>
        </header>
        <Section cx=" h-[85vh] !my-0 !py-0  grid place-items-center ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 w-full lg:w-[650px] px-4">
            <BranchHomeCard
              title="إنشاء فاتورة بيع"
              icon={<TbCreditCardPay />}
              href="/branch/selling-invoices/add"
              viewHref="/branch/selling-invoices"
              viewTitle="فواتير البيع"
            />
            <BranchHomeCard
              title="إنشاء فاتورة مردود"
              icon={<TbTransactionDollar />}
              href="/branch/return-invoices/add"
              viewHref="/branch/return-invoices"
              viewTitle="فواتير المردود"
            />
          </div>
        </Section>
      </div>
    </>
  );
};

export default BranchHome;
