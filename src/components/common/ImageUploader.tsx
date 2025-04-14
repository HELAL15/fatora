import { useState, useEffect } from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { Upload } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { FiUploadCloud } from 'react-icons/fi';
import Button from '../ui/Button';

interface ImageUploaderProps {
  name: string;
  control: Control | FieldValues;
  label?: string;
  isOpen?: boolean;
  rules?: object;
  errors?: FieldErrors;
  multiple?: boolean;
  defaultValue?: string | string[];
  editable?: boolean;
  video?: boolean;
}

const ImageUploader = ({
  name,
  control,
  label = 'files',
  isOpen,
  rules = {},
  errors,
  multiple = false,
  defaultValue = [],
  editable,
  video
}: ImageUploaderProps) => {
  const [previews, setPreviews] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : [defaultValue]
  );

  const { t } = useTranslation();
  useEffect(() => {
    if (!isOpen) {
      setPreviews((prev) => {
        const newPreviews = Array.isArray(defaultValue)
          ? defaultValue
          : [defaultValue];
        return JSON.stringify(prev) === JSON.stringify(newPreviews)
          ? prev
          : newPreviews;
      });
    }
  }, [isOpen, defaultValue]);

  return (
    <div className="image-upload-form">
      <label className="upload-label font-semibold px-1">
        {' '}
        {t(`uploader.${label}`)}
      </label>
      <Controller
        name={name}
        control={control as Control<FieldValues>}
        rules={rules}
        render={({ field }) => (
          <div className="flex items-center flex-wrap gap-4 !mt-1">
            <div className="img space-y-1 flex-grow w-full">
              <Upload
                listType="picture-card"
                showUploadList={false}
                accept={
                  video
                    ? 'video/*'
                    : 'image/png, image/jpeg, image/jpg, image/webp'
                }
                multiple={multiple}
                beforeUpload={(_, fileList) => {
                  const newFiles: File[] = [];
                  const newPreviews: string[] = [];

                  fileList.forEach((file) => {
                    if (!multiple) {
                      const file = fileList[0];
                      const reader = new FileReader();
                      reader.onload = () => {
                        setPreviews([reader.result as string]);
                        field.onChange(file);
                      };
                      reader.readAsDataURL(file);
                    } else {
                      const reader = new FileReader();
                      reader.onload = () => {
                        newPreviews.push(reader.result as string);

                        setPreviews((prev) =>
                          editable
                            ? [...new Set([...newPreviews])]
                            : [...new Set([...prev, ...newPreviews])]
                        );
                      };
                      reader.readAsDataURL(file);
                      newFiles.push(file);
                    }
                  });

                  field.onChange(
                    editable
                      ? [...newFiles]
                      : [...(field.value || []), ...newFiles]
                  );

                  return false;
                }}
                className="custom-upload !bg-transparent flex-grow "
              >
                <div className="flex flex-col items-center gap-2">
                  <FiUploadCloud className="block text-2xl" />
                  <div className="upload-content">
                    <div>{t('uploader.title')}</div>
                  </div>
                  <Button
                    type="button"
                    title="uploadFile"
                    cx="!px-3 !py-1 !text-sm"
                  />
                </div>
              </Upload>
              {errors?.[name] && (
                <p className="text-red-500 text-sm">
                  {errors[name]?.message as string}
                </p>
              )}
            </div>

            {!video &&
              previews.map((preview, index) => (
                <div key={index} className="relative image-preview">
                  <img
                    src={preview}
                    alt="Preview"
                    draggable="false"
                    className=" h-[80px] object-cover rounded-md"
                  />
                  {!editable && (
                    <button
                      type="button"
                      className="absolute cursor-pointer -top-2 -right-2 size-6 bg-red-500 text-white rounded-full"
                      onClick={() => {
                        const newPreviews = previews.filter(
                          (_, i) => i !== index
                        );
                        setPreviews(newPreviews);
                        field.onChange(multiple ? newPreviews : null);
                      }}
                    >
                      <CloseOutlined />
                    </button>
                  )}
                </div>
              ))}
            {video &&
              previews &&
              previews.map((preview, index) => (
                <div key={index} className="relative image-preview">
                  <video
                    src={preview}
                    muted
                    controls
                    className="w-[160px] h-[80px] object-cover rounded-rounded"
                  ></video>
                  {!editable && (
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 size-6 bg-red-500 text-white rounded-full"
                      onClick={() => {
                        const newPreviews = previews.filter(
                          (_, i) => i !== index
                        );
                        setPreviews(newPreviews);
                        field.onChange(multiple ? newPreviews : null);
                      }}
                    >
                      <CloseOutlined />
                    </button>
                  )}
                </div>
              ))}
          </div>
        )}
      />
    </div>
  );
};

export default ImageUploader;
