import classNames from "classnames";

export declare type InputInterface = {
  label?: string;
  hasLabel?: boolean;
  placeholder: string;
}

const Input = ({label, hasLabel=false, placeholder}: InputInterface): JSX.Element => {
  const className = classNames("flex relative mb-2", {
    'pt-5': hasLabel,
    'pt-2': !hasLabel
  });
  return (
    <div className={className} >
      {hasLabel && <label className="absolute top-0.5 left-0.5 text-sm font-semibold text-gray-600">{label}</label>}
      <input placeholder={placeholder} className="border-2 rounded px-3 py-2 flex-1 focus:border-gray-400 focus:outline-none placeholder-gray-300" />
    </div>
  );
};

export default Input;
