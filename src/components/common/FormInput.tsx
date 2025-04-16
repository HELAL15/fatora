import { Input, Tooltip } from 'antd';
import clsx from 'clsx';
import {
  Controller,
  Control,
  FieldValues,
  FieldPath,
  FieldError
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaRegQuestionCircle } from 'react-icons/fa';

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>; // Use the FormData type here
  name: FieldPath<T>;
  rules?: object;
  placeholder?: string;
  type?: string;
  errors?: FieldValues;
  label?: string;
  hint?: string;
}
const { Password } = Input;
function FormInput<T extends FieldValues>({
  control,
  name,
  rules = {},
  // placeholder = '',
  type = 'text',
  errors,
  label = '',
  hint = ''
}: CustomInputProps<T>) {
  const { t } = useTranslation();
  const error = errors?.[name] as FieldError | undefined;
  const errorMessage = error?.message;
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div className="space-y-1">
            <div className="form-input">
              <label htmlFor={name} className="font-semibold text-sm px-1">
                {t(`input.label.${label}`)}
              </label>
              {type === 'password' ? (
                <Password
                  {...field}
                  id={name}
                  placeholder={t(`input.placeholder`, {
                    label: t(`input.label.${label}`)
                  })}
                  value={field.value || ''}
                  className={clsx(
                    `!shadow-none !mt-1 !bg-light !outline-none disabled:bg-[rgba(0_0_0_0.04)] disabled:text-primary disabled:cursor-not-allowed  w-full px-4 !py-3 text-base rounded-rounded border !border-transparent  duration-300 disabled:hover:border-slate-200 hover:border-primary disabled:focus:border-slate-200 focus:!border-primary ${
                      errorMessage ? 'border-red-500' : ''
                    }`
                  )}
                />
              ) : (
                <Input
                  {...field}
                  id={name}
                  type={type}
                  placeholder={t(`input.placeholder`, {
                    label: t(`input.label.${label}`)
                  })}
                  value={field.value || ''}
                  className={clsx(
                    `!shadow-none !mt-1 !bg-light !outline-none disabled:bg-[rgba(0_0_0_0.04)] disabled:text-primary disabled:cursor-not-allowed  w-full px-4 !py-3 text-base rounded-rounded border !border-transparent  duration-300 disabled:hover:border-slate-200 hover:border-primary disabled:focus:border-slate-200 focus:!border-primary ${
                      errorMessage
                        ? '!border-red-500 focus:!border-red-500'
                        : ''
                    }  `
                  )}
                />
              )}
            </div>
            {(hint || error) && (
              <div className="flex flex-col gap-2">
                {error && (
                  <span className="text-red-500 text-xs">{errorMessage}</span>
                )}
                {hint && (
                  <Tooltip title={hint}>
                    <span className="text-gray-400/70 w-fit px-2 flex items-center gap-1 text-xs cursor-pointer">
                      <FaRegQuestionCircle className="text-sm" />
                      {t(`hint`)}
                    </span>
                  </Tooltip>
                )}
              </div>
            )}
          </div>
        )}
      />
    </>
  );
}

export default FormInput;
