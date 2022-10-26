import classNames from 'classnames';
import React from 'react';

export declare interface InputInterface {
  label?: string
  hasLabel?: boolean
  placeholder: string
  name: string
  value: any
  type?: 'text' | 'password'
  testId?: string
  size?: 'sm' | 'md' | 'lg'
  labelPosition?: 'top' | 'left'
  onChange: (data: React.FormEvent<HTMLInputElement>) => void
}

const Input = ({ name, value, label, hasLabel = false, placeholder, onChange, type = 'text', testId, size = 'md', labelPosition = 'top' }: InputInterface): JSX.Element => {
  const className = classNames('flex items-center relative mb-2', {
    'pt-5': hasLabel,
    'pt-2': !hasLabel,
    'justify-end pt-0 mt-3': labelPosition === 'left',
  });

  const inputStyle = classNames('border-2 rounded focus:border-gray-400 focus:outline-none placeholder-gray-300', {
    'px-2 py-1.5 text-sm': size === 'sm',
    'py-2 px-3': size === 'md',
    'py-3 px-3': size === 'lg',
    'w-4/6': labelPosition === 'left',
    'flex-1': labelPosition === 'top',
  });

  const labelStyle = classNames({
    'absolute top-0.5 left-0.5 text-sm font-semibold text-gray-600': labelPosition === 'top',
    'mr-3': labelPosition === 'left',
  });

  return (
    <div className={className} >
      {hasLabel && <label htmlFor={name} className={labelStyle}>{label}</label>}
      <input
        name={name}
        id={name}
        className={inputStyle}
        data-testid={testId}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
