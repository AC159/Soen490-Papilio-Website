import classNames from 'classnames';

import Icon, { IconNames } from '../Icon';

export declare interface TabInterface {
  label: string
  onClick: () => void
  horizontal?: boolean
  isSelected: boolean
  icon?: 'ad' | 'home' | 'event' | 'employee'
}

const Tab = ({ label, isSelected, icon, horizontal = false, onClick }: TabInterface): JSX.Element => {
  const className = classNames('flex py-2 px-3 items-center cursor-pointer', {
    'border-l-4 flex-1': !horizontal,
    'border-b-4 justify-center w-max': horizontal,
    'border-transparent': !isSelected,
  });

  const icons: { [key: string]: IconNames } = {
    ad: IconNames.AD,
    home: IconNames.HOME,
    event: IconNames.EVENT,
    employee: IconNames.EMPLOYEE,
  };

  return (
    <div className={className} onClick={onClick}>
      {icon !== undefined && <Icon name={icons[icon]} size='sm'/>}
      <span className={icon !== undefined ? 'ml-3' : ''}>
        {label}
      </span>
    </div>
  );
};

export default Tab;
