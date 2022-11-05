import { useState, useRef } from 'react';
import Portal from '../../../components/Portal';

export declare interface IPopoverButton {
  id: string
  onClick: () => void
}

const PopoverButton = ({ id, onClick }: IPopoverButton): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const divRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const openMenu = (): void => {
    setShowModal(true);
    onClick();

    divRef.current.addEventListener('mouseleave', () => {
      setShowModal(false);
    });
  };

  return (
    <div className='relative py-2 -my-2' onClick={openMenu} ref={divRef} id={`popover=-${id}`}>
      <span className="material-symbols-outlined align-text-top">more_vert</span>
      {showModal && (
        <Portal wrapper={`popover=-${id}`}>
          <div className='bg-white shadow-md border rounded-sm absolute py-1 right-0 mt-1 z-50 w-36'>
            <div className='bg-white border-y p-1'>Update</div>
            <div className='bg-white border-y p-1'>Delete</div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default PopoverButton;
