import Logo from '../../components/Logo';
import Button from '../../components/Button';

export declare interface BoxFormInterface {
  heading: string
  children: React.ReactNode
  buttonText: string
  buttonOnClick: () => void
  hasBack: boolean
  backButtonOnClick: () => void
}

const BoxForm = ({ heading, buttonText, hasBack, buttonOnClick, children }: BoxFormInterface): JSX.Element => {
  return (
    <div className="border-2 border-gray-200 p-6 max-w-xl">
      <Logo hasText size="md"/>
      <h3 className="text-2xl font-semibold mt-3 mb-3">{heading}</h3>
      {children}
      <div className="flex justify-between items-center pt-3">
        <span>
        {hasBack && (
          // TODO: Make it pretty
          <a href="/">back</a>
        )}
        </span>
        <Button text={buttonText} onClick={buttonOnClick}></Button>
      </div>
    </div>
  );
};

export default BoxForm;
