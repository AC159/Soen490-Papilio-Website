export declare interface IErrorMessage {
  isError: boolean;
  message: string;
}

const ErrorMessage = ({ isError, message }: IErrorMessage): JSX.Element => {
  if (!isError) return <></>;

  return (
    <span className="flex text-red-500 text-sm items-center pl-2 -mt-1.5">
      <span className="material-symbols-outlined mr-1 text-base">error</span>
      {message}
    </span>
  );
};

export default ErrorMessage;
