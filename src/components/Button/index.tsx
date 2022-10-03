import classNames from 'classnames';

export declare interface ButtonInterface {
  text: string
  primary?: boolean
  onClick: () => void
}

const Button = ({ text, onClick, primary = true }: ButtonInterface): JSX.Element => {
  const className = classNames('rounded-md', 'flex', 'px-2', 'py-1', 'border-2', 'border-green-200', 'cursor-pointer', {
    'bg-green-200': primary,
    'bg-none': !primary,
    'text-green-200': !primary,
    'text-white': primary,
  });

  return (
    <div onClick={onClick} className={className}>{text}</div>
  );
};

export default Button;
