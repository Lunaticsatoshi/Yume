import { Info } from 'phosphor-react';
import classNames from 'src/utils/classnames';

interface InputGroupProps {
  className?: string;
  type: string;
  placeholder: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
}

export const InputField: React.FC<InputGroupProps> = ({
  className,
  type,
  placeholder,
  value,
  error,
  setValue,
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        className={classNames(
          'w-full p-3 transition duration-200 border border-gray-300 rounded outline-none bg-gray-50 focus:bg-white hover:bg-white',
          { 'border-red-500': error },
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error ? (
        <div className="w-full mt-1 body-base-regular text-red-300 flex items-center">
          <Info size={16} className="mr-1" />
          {error}
        </div>
      ) : null}
    </div>
  );
};

interface ITextInputField {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}

export const TextInputField: React.FC<ITextInputField> = ({
  name,
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={classNames(
        'text-sm placeholder:text-gray-500 rounded-md focus:outline-none border border-solid px-4 border-gray-200 dark:border-black-200',
        className,
      )}
    />
  );
};

