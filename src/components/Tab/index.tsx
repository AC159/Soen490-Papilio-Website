import classNames from 'classnames';

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

  const icons = {
    ad: 'confirmation_number',
    home: 'home',
    event: 'event_note',
    employee: 'Badge',
  };

  return (
    <div className={className} onClick={onClick}>
      {icon !== undefined && <span className="material-symbols-outlined text-base mr-3">{icons[icon]}</span>}
      <span>{label}</span>
    </div>
  );
};

export default Tab;
