import Logo from '../../components/Logo';
import Button from '../../components/Button';
import { BACK_BUTTON_TEXT, BACK_BUTTON_ICON } from './constant';

export declare interface BoxFormInterface {
  heading: string
  children: React.ReactNode
  buttonText: string
  buttonOnClick: () => void
  hasBack?: boolean
  backButtonOnClick?: () => void
}

const BoxForm = ({ heading, buttonText, hasBack = false, buttonOnClick, children }: BoxFormInterface): JSX.Element => {
  return (
    <div className="border-2 border-gray-200 p-6 max-w-xl">
      <Logo size="md" hasText />
      <h3 className="text-2xl font-semibold mt-4.5 mb-3">{heading}</h3>
      {children}
      <div className="flex justify-between items-center pt-4">
        <span>
        {hasBack && (
          // TODO: Extract it
          <a href="/" className='flex justify-center'>
            <span className="material-symbols-outlined">
              {BACK_BUTTON_ICON}
            </span>
            {BACK_BUTTON_TEXT}
          </a>
        )}
        </span>
        <Button text={buttonText} onClick={buttonOnClick}></Button>
      </div>
    </div>
  );
};

export default BoxForm;
