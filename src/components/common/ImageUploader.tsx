import { useState, useEffect } from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { Upload, Image, Modal } from 'antd';
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
  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentPreview, setCurrentPreview] = useState<string | null>(null);

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

  const fileList = previews.map((preview, index) => ({
    uid: String(index),
    name: `file-${index + 1}`,
    url: preview
  }));

  const handlePreview = (file: FieldValues) => {
    let src = file.url || (file.preview as string);
    if (!src && file.originFileObj) {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => {
        src = reader.result as string;
        setCurrentPreview(src);
        setPreviewVisible(true);
      };
    } else {
      setCurrentPreview(src);
      setPreviewVisible(true);
    }
  };

  return (
    <div className="image-upload-form">
      <label className="upload-label font-semibold px-1">
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
                listType="picture"
                showUploadList={true}
                defaultFileList={fileList}
                accept={
                  video
                    ? 'video/*'
                    : 'image/png, image/jpeg, image/jpg, image/webp'
                }
                maxCount={multiple ? undefined : 1}
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
                onPreview={handlePreview}
                onRemove={(file) => {
                  const newPreviews = previews.filter(
                    (preview) => preview !== file.url
                  );
                  setPreviews(newPreviews);
                  field.onChange(
                    editable ? [...(field.value || []), ...newPreviews] : ''
                  );
                }}
                className="custom-upload !bg-transparent flex-grow"
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

            {/* Preview Modal for Images and Videos */}
            {video && currentPreview ? (
              <Modal
                open={previewVisible}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
                width={800}
              >
                <video
                  src={currentPreview}
                  controls
                  className="w-full h-auto"
                  autoPlay
                />
              </Modal>
            ) : (
              <Image
                wrapperStyle={{ display: 'none' }}
                preview={{
                  visible: previewVisible,
                  onVisibleChange: (visible) => setPreviewVisible(visible),
                  afterOpenChange: (visible) =>
                    !visible && setCurrentPreview(null)
                }}
                src={currentPreview as string}
              />
            )}

            {video &&
              previews &&
              previews.map((preview, index) => (
                <div key={index} className="relative image-preview">
                  <video
                    src={preview}
                    muted
                    controls
                    className="w-[160px] h-[80px] object-cover rounded-rounded"
                  />
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
