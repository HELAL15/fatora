import { FC, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { message, Modal, Spin } from 'antd';
import { AxiosError } from 'axios';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { FieldValues } from 'react-hook-form';
import { IoWarningOutline } from 'react-icons/io5';
import { DeleteData } from '../../../lib/utils/SendRequestes';
import Button from '../../ui/Button';

/**
 * ==> props interface
 */
interface IProps {
  id?: string;
  endPoint?: string;
  close?: () => void;
  title?: string;
  record?: FieldValues;
}

/**
 * ==> Component
 */
const DeleteAction: FC<IProps> = ({ id, endPoint, close, title, record }) => {
  const { id: idParam } = useParams();
  const { t } = useTranslation();
  const [openSuccess, setSuccess] = useState<boolean>(false);

  // Find all protected properties
  const protectedProperties = record
    ? Object.keys(record)
        .filter((key) => key.startsWith('has_') && record[key] === true)
        .map((key) => key.replace('has_', '')) // Remove 'has_' prefix
    : [];

  const hasProtectedProperty = protectedProperties.length > 0;

  const queryClient = useQueryClient();
  const { mutate, isPending, data } = useMutation({
    mutationFn: () => DeleteData(`${endPoint}/${id}`),
    onSuccess: () => {
      if (close) {
        close();
      }
      setSuccess(true);
      queryClient.invalidateQueries({
        queryKey: [
          endPoint === 'categories'
            ? title === 'sub category'
              ? `sub-categories/${idParam}`
              : 'main-categories'
            : endPoint
        ]
      });
    },
    onError: (error) => {
      queryClient.invalidateQueries({
        queryKey: [endPoint === 'categories' ? 'main-categories' : endPoint]
      });
      if (error instanceof AxiosError) {
        message.error(error.response?.data?.message || error.message);
      }
    }
  });
  console.log(protectedProperties.join(', '));

  const handleDelete = () => {
    if (!hasProtectedProperty) {
      mutate();
    }
  };

  return (
    <>
      <Spin spinning={isPending} size="large">
        <div className="flex flex-col gap-6 justify-center items-center">
          {hasProtectedProperty ? (
            <IoWarningOutline className="text-7xl text-primary" />
          ) : (
            // <SureIco />
            <IoWarningOutline className="text-7xl text-primary" />
          )}
          {hasProtectedProperty ? (
            <>
              <p>
                {t('completion.cannotDeleteReason', {
                  name: t(`${title}.name`),
                  reasons: protectedProperties
                    .map((prop) => t(`${prop}.name`))
                    .join(', ')
                })}
              </p>
            </>
          ) : (
            <p>{t('completion.delete', { name: t(`${title}.name`) })}</p>
          )}
          <div className="flex items-center gap-4">
            {!hasProtectedProperty && (
              <Button
                onClick={handleDelete}
                title="delete"
                disabled={isPending}
              />
            )}
            <Button
              onClick={close}
              outline
              title="cancel"
              disabled={isPending}
            />
          </div>
        </div>
      </Spin>

      <Modal
        title={t('completion.successDel', { name: t(`${title}.name`) })}
        open={openSuccess}
        onCancel={() => setSuccess(false)}
        footer={null}
        centered
        className="dashboard-modal"
      >
        <Spin spinning={isPending} size="large">
          <div className="flex flex-col gap-6 justify-center items-center">
            {/* <SuccessIo /> */}
            lll
            <p>{data?.message as string}</p>
          </div>
        </Spin>
      </Modal>
    </>
  );
};

export default DeleteAction;

// Update your translation files (e.g., en.json):
// "completion": {
//   "delete": "Are you sure you want to delete {name}?",
//   "successDel": "{name} deleted successfully",
//   "cannotDeleteReason": "Cannot delete {name} as it is assigned to {reasons}"
// }
