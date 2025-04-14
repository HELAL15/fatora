import clsx from 'clsx';
import {
  Controller,
  Control,
  FieldValues,
  FieldPath,
  FieldError
} from 'react-hook-form';
import { useRef } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: object;
  placeholder?: string;
  errors?: FieldValues;
}

function ColorSelector<T extends FieldValues>({
  control,
  name,
  rules = {},
  placeholder = '',
  errors
}: CustomInputProps<T>) {
  const { t } = useTranslation();
  const error = errors?.[name] as FieldError | undefined;
  const errorMessage = error?.message;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const openColorPicker = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const colorValue = field.value || '#295E56';

          return (
            <div className="space-y-4">
              <div className="form-input border border-light rounded-rounded py-1 px-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <input
                    {...field}
                    id={name}
                    type="color"
                    placeholder={placeholder}
                    value={colorValue}
                    ref={inputRef}
                    className={clsx(
                      `!border-none !outline-none !shadow-none !size-8`
                    )}
                  />
                  <span>{colorValue}</span>
                </div>
                <button
                  type="button"
                  className="cursor-pointer flex items-center gap-1"
                  onClick={openColorPicker}
                >
                  <MdModeEdit className="text-base" />{' '}
                  <span>{t('button.pickColor')}</span>
                </button>
              </div>

              {error && (
                <span className="text-red-500 text-sm">{errorMessage}</span>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}

export default ColorSelector;
