import classNames from 'classnames';
import { useState } from 'react';
import Tab from '../../components/Tab';

export declare interface TabListInterface {
  tabs: ITab[];
  horizontal?: boolean;
  type?: 'link' | 'button';
}

export declare interface ITab {
  label: string;
  icon?: 'ad' | 'home' | 'event' | 'employee' | 'feed' | 'billing';
  path?: string;
}

const TabList = ({
  tabs,
  horizontal = false,
  type = 'button',
}: TabListInterface): JSX.Element => {
  const [selected, setSelected] = useState<string>(tabs[0].label);
  const className = classNames('flex', {
    'flex-row': horizontal,
    'flex-col': !horizontal,
  });

  const onClick = (label: string): void => {
    setSelected(label);
  };
  return (
    <div className={className}>
      {tabs.length > 0 &&
        tabs.map(({ label, icon, path }) => (
          <Tab
            key={label}
            type={type}
            icon={icon}
            to={path}
            label={label}
            testId="tab-test-id"
            onClick={() => {
              onClick(label);
            }}
            horizontal={horizontal}
            isSelected={selected === label}
          />
        ))}
    </div>
  );
};

export default TabList;
