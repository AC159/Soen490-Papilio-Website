/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useRef } from 'react';
import Portal from '../../../components/Portal';

export declare interface IPopoverButton {
  id: string
  onDelete: () => Promise<void>
  onUpdate: (data: any) => Promise<void>
}

const PopoverButton = ({ id, onUpdate, onDelete }: IPopoverButton): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const divRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const openMenu = (): void => {
    setShowModal(true);

    divRef.current.addEventListener('mouseleave', () => {
      setShowModal(false);
    });
  };

  return (
    <div className='relative py-2 -my-2' onClick={openMenu} ref={divRef} id={`popover-${id}`}>
      <span className="material-symbols-outlined align-text-top">more_vert</span>
      {showModal && (
        <Portal wrapper={`popover-${id}`}>
          <div className='bg-white shadow-md border rounded-sm absolute py-1 right-0 mt-1 z-50 w-36'>
            <div className='bg-white border-y p-1' onClick={onUpdate}>Update</div>
            <div className='bg-white border-y p-1' onClick={onDelete}>Delete</div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default PopoverButton;
