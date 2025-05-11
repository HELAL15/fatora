import { Modal } from 'antd';
import React, { FC, memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { IoAddOutline } from 'react-icons/io5';
import Button from './Button';
import useToggle from '../../hooks/useToggle';
import clsx from 'clsx';

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
  children,
  inHome,
  responsive,
  inTable,
  icon,
  close
}) => {
  const { t } = useTranslation();

  const [isToggle, toggle] = useToggle();

  return (
    <>
      {inHome ? (
        <button
          className="btn secondary-btn flex items-center gap-2 cursor-pointer"
          onClick={toggle}
        >
          {t('add-new')} <IoAddOutline className="text-lg" />
        </button>
      ) : inTable ? (
        <Button onClick={toggle} title={'add'} />
      ) : (
        <button
          className={clsx(
            `
            cursor-pointer
            ${icon ? 'text-xl' : 'w-full h-full text-start'}
            `
          )}
          onClick={toggle}
        >
          {icon ? icon : t(`actions.${title}`)}
        </button>
      )}

      <Modal
        maskClosable={true}
        destroyOnClose
        title={`${t(`${title}`)}`}
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
        open={isToggle}
        onCancel={toggle || close}
        footer={null}
        centered
        className="dashboard-modal"
      >
        {React.cloneElement(
          children as React.ReactElement<{ close: () => void }>,
          {
            close: toggle || close
          }
        )}
        {/* {children} */}
      </Modal>
    </>
  );
};

export default memo(DashboardModal);
