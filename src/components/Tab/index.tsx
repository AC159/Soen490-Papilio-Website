import classNames from 'classnames';
import { Link, LinkProps } from 'react-router-dom';

import Icon, { IconNames } from '../Icon';

export declare interface TabInterface {
  label: string
  onClick?: () => void
  horizontal?: boolean
  to?: LinkProps['to']
  isSelected: boolean
  icon?: 'ad' | 'home' | 'event' | 'employee'
  type?: 'button' | 'link'
  testId?: string
}

const Tab = ({ label, isSelected, icon, horizontal = false, onClick, type = 'button', to = '', testId }: TabInterface): JSX.Element => {
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

  const Content: React.ReactNode = (
    <>
      {icon !== undefined && <Icon name={icons[icon]} size='sm'/>}
      <span className={icon !== undefined ? 'ml-3' : ''}>
        {label}
      </span>
    </>
  );

  if (type === 'button') {
    return (
      <div data-testid={testId} className={className} onClick={onClick}>
        {Content}
      </div>
    );
  }

  return (
    <Link data-testid={testId} className={className} to={to} onClick={onClick}>
      {Content}
    </Link>
  );
};

export default Tab;
