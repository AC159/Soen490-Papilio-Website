import { useEffect, useRef, useState } from 'react';

declare interface SelectProps {
  label: string;
  options: any[];
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onOptionClick?: (event: React.MouseEvent<HTMLOptionElement>) => void;
}

export const Select = ({
  label,
  options,
  value,
  onChange,
  onOptionClick = () => {},
}: SelectProps): JSX.Element => {
  const ref = useRef();
  const [showOptions, setShowOptions] = useState(false);
  const [listItems, setListItems] = useState(options);

  const handleClickInput = (): void => {
    setShowOptions(true);
  };

  const handleOnBlur = (): void => {
    setShowOptions(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', checkFocus.bind(this));
    return () => {
      document.removeEventListener('mousedown', checkFocus.bind(this));
    };
  }, []);

  const checkFocus = (event: any): void => {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (ref.current && !ref.current.contains(event.target)) {
      handleOnBlur();
    }
  };

  useEffect(() => {
    const itemsList = options.filter((item) =>
      item.value.toLowerCase().includes(value.toLowerCase()),
    );
    setListItems(itemsList);
  }, [value, options]);

  return (
    <div
      // @ts-expect-error
      ref={ref}
      onClick={handleClickInput}
      className="flex w-full"
    >
      <label htmlFor="customSelect">{label}</label>
      <input
        id="customSelect"
        type="text"
        value={value}
        list="optionsList"
        onChange={onChange}
        className="my-2 p-2 px-2 bg-white border border-gray-200 rounded outline-none appearance-none w-full text-gray-800"
      />
      <datalist
        data-testid="optionsList"
        id="optionsList"
        className="bg-white appearance-none drop-shadow-none"
      >
        {showOptions &&
          listItems.map(({ value }, i) => (
            <option key={i} value={value} onClick={onOptionClick}>
              {value}
            </option>
          ))}
      </datalist>
    </div>
  );
};
