import classNames from 'classnames';

import Icon, { IconNames } from '../Icon';

export declare interface ButtonInterface {
  text?: string
  hasText?: boolean
  hasIcon?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-secondary' | 'outline-dark' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  iconSize?: 'sm' | 'md' | 'lg'
  icon?: IconNames
  iconPosition?: 'rhs' | 'lhs'
  margin?: 'right' | 'left'
  testId?: string
  onClick: () => void | Promise<void>
}

const Button = ({
  text, margin, testId, onClick, variant = 'primary',
  hasText = true, icon = IconNames.SEARCH, size = 'md',
  hasIcon = false, iconPosition = 'rhs', iconSize = 'md',
}: ButtonInterface): JSX.Element => {
  const OutlineStyle = classNames(
    'border-2 border-brand-orange text-brand-orange',
    {
      'px-2 py-0.5': size === 'sm',
      'px-3 py-1.5': size === 'md' && variant === 'outline',
      'px-4 py-2.5': size === 'lg' && variant === 'outline',
    });

  const DarkOutlineStyle = classNames(
    'border-2 border-brand-blue-dark border-opacity-50 text-brand-blue-dark rounded hover:border-brand-orange hover:text-brand-orange',
    {
      'px-2 py-0.5': size === 'sm',
      'px-3 py-1.5': size === 'md' && variant === 'outline-dark',
      'px-4 py-2.5': size === 'lg' && variant === 'outline-dark',
    });

  const NormalStyle = classNames(
    'hover:bg-brand-orange',
    {
      'px-2.5 py-1': size === 'sm',
      'px-3.5 py-2': size === 'md',
      'px-4.5 py-3': size === 'lg',
    });

  const className = classNames(
    'rounded', 'flex', 'cursor-pointer',
    'justify-center', 'w-max', 'box-content', 'items-center',
    {
      'bg-brand-blue-dark text-white': variant === 'primary',
      'bg-brand-blue text-white': variant === 'secondary',
      [NormalStyle]: variant === 'primary' || variant === 'secondary',
      [DarkOutlineStyle]: variant === 'outline-dark',
      [OutlineStyle]: variant === 'outline',
      'p-0': variant === 'ghost',
      'mr-1': margin === 'right',
      'ml-1': margin === 'left',
    });

  const withIconStyle = classNames({
    'mr-2': iconPosition === 'rhs',
    'ml-2': iconPosition === 'lhs',
  });

  const textStyle = classNames({
    [withIconStyle]: hasIcon,
  });

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <div data-testid={testId} onClick={onClick} className={className}>
      {hasIcon && iconPosition === 'lhs' && <Icon name={icon} size={iconSize}/>}
      {hasText && <span className={textStyle}>{text}</span>}
      {hasIcon && iconPosition === 'rhs' && <Icon name={icon} size={iconSize}/>}
    </div>
  );
};

export default Button;
