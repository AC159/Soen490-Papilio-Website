import classNames from 'classnames';

export declare interface IconInterface {
  size: 'sm' | 'md' | 'lg'
  name: IconNames
}

export enum IconNames {
  HOME = 'home',
  AD = 'confirmation_number',
  EVENT = 'event_note',
  EMPLOYEE = 'badge',
  EDIT = 'edit',
  DONE = 'done',
  SEARCH = 'search'
}

const Icon = ({ size, name }: IconInterface): JSX.Element => {
  const classname = classNames(
    'material-symbols-outlined',
    {
      'text-base': size === 'sm',
      'text-lg': size === 'md',
      'text-2xl': size === 'lg',
    }
  );
  return (
    <span className={classname}>{name}</span>
  );
};

export default Icon;
