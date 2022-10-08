import classNames from 'classnames';

export declare interface ButtonInterface {
  text: string
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-secondary'
  size?: 'sm' | 'md' | 'lg'
  icon?: 'add' | 'none'
  iconPosition?: 'rhs' | 'lhs'
  margin?: 'right' | 'left'
  onClick: () => void
}

const Button = ({ text, onClick, variant = 'primary', size = 'md', margin }: ButtonInterface): JSX.Element => {
  const className = classNames(
    'rounded-md', 'flex', 'px-2', 'py-1', 'cursor-pointer',
    'justify-center', 'w-max', 'box-content',
    {
      'bg-brand-orange text-white': variant === 'primary',
      'bg-brand-blue text-white': variant === 'secondary',
      'border-2 border-brand-orange text-brand-orange': variant === 'outline',
      'px-2 py-0.5': size === 'sm' && variant === 'outline',
      'px-3 py-1.5': size === 'md' && variant === 'outline',
      'px-4 py-2.5': size === 'lg' && variant === 'outline',
      'px-2.5 py-1': size === 'sm' && variant !== 'outline',
      'px-3.5 py-2': size === 'md' && variant !== 'outline',
      'px-4.5 py-3': size === 'lg' && variant !== 'outline',
      'mr-1': margin === 'right',
      'ml-1': margin === 'left',
    });

  return (
    <div onClick={onClick} className={className}>
      <span>{text}</span>
    </div>
  );
};

export default Button;
