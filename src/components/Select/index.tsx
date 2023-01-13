import React, { useCallback, useEffect, useState } from 'react';
import InputWrapper from '../InputWrapper';

export declare interface SelectInterface {
  name: string;
  value: any;
  label: string;
  placeholder: string;
  items: ItemType[];
  isError?: boolean;
  onChange: (data: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onManualChange: (name: string, value: string) => void;
}

declare interface SelectInputType {
  name: string;
  value: any;
  placeholder: string;
  setIsDirty: (value: boolean) => void;
  onChange: (data: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

declare interface BasicItemType {
  type: 'basic';
  value: string;
  display: string;
}
declare interface ItemWithImageType {
  type: 'image';
  value: string;
  display: string;
  img: string;
}
export declare type ItemType = BasicItemType | ItemWithImageType;

const SelectInput = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder,
}: SelectInputType): JSX.Element => {
  return (
    <div className="w-full">
      <div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
        <input
          value={value}
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};

const SelectItemWithImage = ({
  // value,
  display,
  img,
  onClick,
}: {
  value: string;
  display: string;
  img: string;
  onClick: () => void;
}): JSX.Element => {
  return (
    <div
      className="flex flex-col w-full first:rounded-t last:rounded-b border-b last:border-b-0"
      onClick={onClick}
    >
      <div className="cursor-pointer w-full border-gray-100 hover:bg-brand-blue-light-dark hover:text-white">
        <div className="flex w-full items-center p-2 hover:border-brand-blue-light-dark">
          <div className="flex w-5 h-5 justify-center items-center ml-1.5 mr-2">
            {img}
          </div>
          <div className="w-full items-center flex ml-2">{display}</div>
        </div>
      </div>
    </div>
  );
};

const SelectItem = ({
  // value,
  display,
  onClick,
}: {
  value: string;
  display: string;
  onClick: () => void;
}): JSX.Element => {
  return (
    <div
      className="flex flex-col w-full first:rounded-t last:rounded-b border-b last:border-b-0"
      onClick={onClick}
    >
      <div className="cursor-pointer w-full border-gray-100 hover:bg-brand-blue-light-dark hover:text-white">
        <div className="flex w-full items-center p-2 pl-2 relative">
          <div className="w-full items-center flex">{display}</div>
        </div>
      </div>
    </div>
  );
};

const Select = ({
  name,
  value,
  label,
  placeholder,
  items,
  onChange,
  onBlur,
  onManualChange,
}: SelectInterface): JSX.Element => {
  const [isDirty, setIsDirty] = useState(false);
  const [data, setData] = useState<ItemType[]>([]);

  const handleEnterSubmit = useCallback((event: KeyboardEvent) => {
    const { key } = event;

    if (key === 'Enter') {
      console.log('object');
    }
  }, []);

  useEffect(() => {
    const itemList = items.filter((item) =>
      item.display.toLowerCase().startsWith(value.toLowerCase()),
    );
    setData(itemList);
  }, [value]);

  useEffect(() => {
    window.addEventListener('keydown', handleEnterSubmit);

    return () => window.removeEventListener('keydown', handleEnterSubmit);
  }, []);

  return (
    <InputWrapper name={name} hasLabel={true} label={label}>
      <div className="flex flex-col w-4/6">
        <div className="w-full flex flex-col">
          <div
            className="w-full flex flex-col relative"
            onBlur={() => setTimeout(() => setIsDirty(false), 140)}
            onFocus={() => setIsDirty(true)}
          >
            <SelectInput
              name={name}
              value={value}
              placeholder={placeholder}
              setIsDirty={setIsDirty}
              onChange={onChange}
              onBlur={onBlur}
            />
            {isDirty && (
              <div className="absolute shadow-md shadow-slate-300 top-14 z-40 w-full left-0 rounded overflow-y-auto bg-white">
                {data.map((item) => {
                  if (item.type === 'basic') {
                    return (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        display={item.display}
                        onClick={() => onManualChange(name, item.value)}
                      />
                    );
                  }
                  return (
                    <SelectItemWithImage
                      value={item.value}
                      key={item.value}
                      display={item.display}
                      img={item.img}
                      onClick={() => onManualChange(name, item.value)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </InputWrapper>
  );
};

export default Select;
