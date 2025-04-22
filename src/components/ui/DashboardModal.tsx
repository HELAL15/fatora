import { Modal } from 'antd';
import React, { FC, memo, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoAddOutline } from 'react-icons/io5';
import Button from './Button';

interface IProps {
  id?: string;
  endPoint?: string;
  title?: string;
  modalTitle?: string;
  children?: React.ReactElement<{ close: () => void }>;
  inHome?: boolean;
  responsive?: boolean;
  inTable?: boolean;
  icon?: ReactNode;
  close?: () => void;
}

const DashboardModal: FC<IProps> = ({
  title,
  modalTitle,
  children,
  inHome,
  responsive,
  inTable,
  icon,
  close
}) => {
  const { t } = useTranslation();

  // show
  const [modalVisible, setModalVisible] = useState(false);

  // open modal
  const showModal = () => {
    setModalVisible(true);
  };

  // close modal
  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      {inHome ? (
        <button
          className="btn secondary-btn flex items-center gap-2 cursor-pointer"
          onClick={showModal}
        >
          {t('add-new')} <IoAddOutline className="text-lg" />
        </button>
      ) : inTable ? (
        <Button onClick={showModal} title={'add'} />
      ) : (
        // <button
        //   className="w-full h-full text-center cursor-pointer rounded-rounded px-4 py-1 underline text-blue-500 "
        //   onClick={showModal}
        // >
        //   {t(`actions.${title}`)}
        // </button>
        <button
          className="w-full h-full text-start cursor-pointer"
          onClick={showModal}
        >
          {icon ? icon : t(`actions.${title}`)}
        </button>
      )}

      <Modal
        maskClosable={true}
        destroyOnClose
        title={`${t(`actions.${title}`)} ${
          modalTitle ? t(`${modalTitle}.name`) : ''
        }`}
        width={
          responsive
            ? {
                xs: '90%',
                sm: '80%',
                md: '70%',
                lg: '75%',
                xl: '65%',
                xxl: '55%'
              }
            : '500px'
        }
        open={modalVisible}
        onCancel={handleCancel || close}
        footer={null}
        centered
        className="dashboard-modal"
      >
        {React.cloneElement(
          children as React.ReactElement<{ close: () => void }>,
          {
            close: handleCancel || close
          }
        )}
        {/* {children} */}
      </Modal>
    </>
  );
};

export default memo(DashboardModal);
