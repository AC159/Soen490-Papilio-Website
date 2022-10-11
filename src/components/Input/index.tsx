import classNames from 'classnames';
import React from 'react';

export declare interface InputInterface {
  label?: string
  hasLabel?: boolean
  placeholder: string
  name: string
  value: any
  type?: 'text' | 'password'
  onChange: (data: React.FormEvent<HTMLInputElement>) => void
}

const Input = ({ name, value, label, hasLabel = false, placeholder, onChange, type = 'text' }: InputInterface): JSX.Element => {
  const className = classNames('flex relative mb-2', {
    'pt-5': hasLabel,
    'pt-2': !hasLabel,
  });
  return (
    <div className={className} >
      {hasLabel && <label className="absolute top-0.5 left-0.5 text-sm font-semibold text-gray-600">{label}</label>}
      <input
        name={name}
        className="border-2 rounded px-3 py-2 flex-1 focus:border-gray-400 focus:outline-none placeholder-gray-300"
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
