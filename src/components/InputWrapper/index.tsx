import classNames from 'classnames';

export declare interface InputWrapperProps {
  name: string;
  label?: string;
  variant?: 'normal' | 'ghost';
  hasLabel: boolean;
  labelPosition?: 'top' | 'left';
  children: React.ReactElement;
}

const InputWrapper = ({
  name,
  label,
  variant = 'normal',
  hasLabel = false,
  labelPosition = 'left',
  children,
}: InputWrapperProps): JSX.Element => {
  const className = classNames('flex items-center relative', {
    'mb-2': variant === 'normal',
    'pt-5': hasLabel,
    'pt-2': !hasLabel,
    'justify-end pt-0 mt-3': labelPosition === 'left',
    'pt-0 flex-1': variant === 'ghost',
  });

  const labelStyle = classNames({
    'absolute top-0.5 left-0.5 text-sm font-semibold text-gray-600':
      labelPosition === 'top',
    'mr-3': labelPosition === 'left',
  });

  return (
    <div className={className}>
      {hasLabel && (
        <label htmlFor={name} className={labelStyle}>
          {label}
        </label>
      )}
      {children}
    </div>
  );
};

export default InputWrapper;
