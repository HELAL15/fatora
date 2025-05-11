import { Select } from 'antd';
import { memo, useState } from 'react';
import {
  Control,
  FieldValues,
  FieldErrors,
  RegisterOptions,
  Controller,
  Path,
  PathValue
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/**
 * ==> Props interface
 */
interface IProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  placeholder?: string;
  errors: FieldErrors<T>;
  data?: { id: number | string; name: string }[];
  loading?: boolean;
  defaultVal?: PathValue<T, Path<T>>;
  onChange?: (value: string) => void;
  hasColor?: boolean;
  mode?: 'multiple' | 'tags' | undefined;
  disabled?: boolean;
  lang?: string;
}

/**
 * ==> Component
 */
const { Option } = Select;

const FormSelect = <T extends FieldValues>({
  control,
  rules,
  label,
  name,
  data = [],
  errors,
  placeholder,
  loading = false,
  defaultVal,
  onChange,
  hasColor = false,
  mode,
  disabled = false,
  lang = ''
}: IProps<T>) => {
  const errorMessage = errors[name]?.message as string;
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const handleChange = (value: string) => {
    setOpen(false);
    onChange?.(value);
  };

  return (
    <div className="input-package">
      {label && (
        <label htmlFor={name} className="font-semibold text-sm px-1">
          {t(`input.label.${label}`)} {lang ? t(`input.lang.${lang}`) : ''}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultVal ?? undefined}
        rules={rules}
        render={({ field }) => (
          <Select
            key={name}
            {...field}
            mode={mode}
            allowClear
            status={errorMessage && 'error'}
            open={open}
            disabled={loading || disabled}
            className="w-full !rounded-[5px] !shadow-none !outline-none !min-h-[47.7px] md:!min-h-[47.7px]"
            onChange={(value) => {
              field.onChange(value ?? undefined);
              handleChange(value);
            }}
            placeholder={placeholder}
            popupMatchSelectWidth={false}
            onDropdownVisibleChange={(open) => setOpen(open)}
          >
            {data?.map(
              (item: { id: string | number; code?: string; name: string }) => (
                <Option key={item.id} value={item.id}>
                  {hasColor ? (
                    <div className="flex items-center gap-2">
                      <span
                        className="size-6 rounded-full "
                        style={{
                          backgroundColor: item.code
                        }}
                      ></span>
                      {item.code}
                    </div>
                  ) : (
                    item.name
                  )}
                </Option>
              )
            )}
          </Select>
        )}
      />

      {errorMessage && (
        <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

// Proper typing for memoized component
export default memo(FormSelect) as <T extends FieldValues>(
  props: IProps<T>
) => React.ReactElement;
