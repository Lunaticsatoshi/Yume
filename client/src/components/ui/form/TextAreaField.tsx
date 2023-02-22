import React, { FC } from 'react';
import classNames from 'src/utils/classnames';

interface ITextAreaField {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}

const TextAreaField: FC<ITextAreaField> = ({
  name,
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={classNames(
        'text-sm placeholder:text-gray-500 focus:outline-none border border-solid px-4 py-2 border-gray-200 dark:border-black-200',
        className,
      )}
    />
  );
};

export default TextAreaField;
