import classNames from 'classnames';
import { useState } from 'react';
import Tab from '../../components/Tab';

export declare interface TabListInterface {
  tabs: ITab[]
  horizontal?: boolean
}

export declare interface ITab {
  label: string
  icon?: 'ad' | 'home' | 'event' | 'employee'
}

const TabList = ({ tabs, horizontal = false }: TabListInterface): JSX.Element => {
  const [selected, setSelected] = useState<string>(tabs[0].label);
  const className = classNames('flex', {
    'flex-row': horizontal,
    'flex-col': !horizontal,
  });

  const onClick = (label: string): void => { setSelected(label); };
  return (
    <div className={className} >
      {tabs.length > 0 && tabs.map(({ label, icon }) => (
        <Tab key={label} icon={icon} label={label} onClick={() => { onClick(label); }} horizontal={horizontal} isSelected={selected === label}/>
      ))}
    </div>
  );
};

export default TabList;