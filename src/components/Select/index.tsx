import React, { useCallback, useEffect } from 'react';

export declare interface SelectInterface {
  name: string;
  value: any;
  isError?: boolean;
  onChange: (data: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

const SelectInput = ({ name, placeholder }: any): JSX.Element => {
  return (
    <div className="w-full">
      <div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
        <div className="flex flex-auto flex-wrap"></div>
        <input
          name={name}
          placeholder={placeholder}
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>
    </div>
  );
};

const SelectItem = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full first:rounded-t last:rounded-b border-b last:border-b-0">
      <div className="cursor-pointer w-full border-gray-100 hover:bg-brand-blue-light-dark hover:text-white">
        <div className="flex w-full items-center p-2 pl-2 relative hover:border-brand-blue-light-dark">
          <div className="w-6 flex flex-col items-center">
            <div className="flex relative w-5 h-5 justify-center items-center m-1 mr-2 mt-1 rounded-full ">
              <img
                className="rounded-full"
                alt="A"
                src="https://randomuser.me/api/portraits/men/62.jpg"
              />{' '}
            </div>
          </div>
          <div className="w-full items-center flex">
            <div className="mx-2 -mt-1">Jack jhon</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Select = ({ name }: SelectInterface): JSX.Element => {
  const handleEnterSubmit = useCallback((event: KeyboardEvent) => {
    const { key } = event;

    if (key === 'Enter') {
      console.log('object');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleEnterSubmit);

    return () => window.removeEventListener('keydown', handleEnterSubmit);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <div className="w-full">
          <div className="flex flex-col items-center relative">
            <SelectInput name={name} />
            <div className="absolute shadow-md shadow-slate-300 top-14 z-40 w-full left-0 rounded overflow-y-auto">
              {[1, 2, 3].map((key) => (
                <SelectItem key={key} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;
