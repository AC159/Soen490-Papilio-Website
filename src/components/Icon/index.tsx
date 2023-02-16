import classNames from 'classnames';

export declare interface IconInterface {
  size: 'sm' | 'md' | 'lg';
  name: IconNames;
}

// The icons name can be found in google fonts: https://fonts.google.com/icons
export enum IconNames {
  HOME = 'home',
  AD = 'confirmation_number',
  EVENT = 'event_note',
  EMPLOYEE = 'badge',
  EDIT = 'edit',
  DONE = 'done',
  SEARCH = 'search',
  ADD = 'add',
  DELETE = 'delete',
  FEED = 'feed',
  EDIT_SQUARE = 'edit_square',
  SAVE = 'save',
  BILLING = 'payments',
}

const Icon = ({ size, name }: IconInterface): JSX.Element => {
  const classname = classNames('material-symbols-outlined', {
    'text-base': size === 'sm',
    'text-lg': size === 'md',
    'text-2xl': size === 'lg',
  });
  return <span className={classname}>{name}</span>;
};

export default Icon;
