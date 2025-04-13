import { Input } from 'antd';
import clsx from 'clsx';
import {
  Controller,
  Control,
  FieldValues,
  FieldPath,
  FieldError
} from 'react-hook-form';

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>; // Use the FormData type here
  name: FieldPath<T>;
  rules?: object;
  placeholder?: string;
  type?: string;
  errors?: FieldValues;
  label?: string;
}

function FormInput<T extends FieldValues>({
  control,
  name,
  rules = {},
  placeholder = '',
  type = 'text',
  errors,
  label = ''
}: CustomInputProps<T>) {
  const error = errors?.[name] as FieldError | undefined;
  const errorMessage = error?.message;
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div className="space-y-4">
            <div className="form-input">
              <label htmlFor={name} className="font-semibold px-2">
                {label}
              </label>
              <Input
                {...field}
                id={name}
                type={type}
                placeholder={placeholder}
                value={field.value || ''}
                className={clsx(
                  `!shadow-none !outline-none disabled:bg-[rgba(0_0_0_0.04)] h-[40px] md:h-[45px] disabled:text-primary disabled:cursor-not-allowed  w-full px-4 py-3 text-base rounded-[5px] border border-s-slate-200 duration-300 disabled:hover:border-slate-200 hover:border-primary disabled:focus:border-slate-200 focus:border-primary ${
                    errorMessage ? 'border-red-500' : ''
                  } ${type === 'color' ? '!h-[50px] py-0' : ''} `
                )}
              />
            </div>
            {error && (
              <span className="text-red-500 text-sm">{errorMessage}</span>
            )}
          </div>
        )}
      />
    </>
  );
}

export default FormInput;
