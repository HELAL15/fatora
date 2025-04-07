import {
  Controller,
  Control,
  FieldValues,
  FieldPath,
  FieldError,
} from 'react-hook-form';

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>; // Use the FormData type here
  name: FieldPath<T>;
  rules?: object;
  placeholder?: string;
  type?: string;
  errors?: FieldValues;
}

function FormInput<T extends FieldValues>({
  control,
  name,
  rules = {},
  placeholder = '',
  type = 'text',
  errors,
}: CustomInputProps<T>) {
  const error = errors?.[name] as FieldError | undefined; // Get the error for this specific field

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div>
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              value={field.value || ''} // Ensure value is never undefined
              className={error ? 'border-red-500' : ''}
            />
            {error && (
              <span className="text-red-500 text-sm">{error.message}</span>
            )}
          </div>
        )}
      />
    </div>
  );
}

export default FormInput;
