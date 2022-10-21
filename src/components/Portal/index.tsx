// @ts-nocheck
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export declare interface PortalInterface {
  children: React.ReactNode
  wrapper?: string
}

const Portal = ({ children, wrapper = 'modal' }: PortalInterface): JSX.Element => {
  const ref = useRef<Node>(null);

  if (ref.current == null) {
    ref.current = document.createElement('div');
  }

  useEffect((): () => void => {
    const modal = document.getElementById(wrapper);
    modal?.appendChild(ref.current);
    return () => modal?.removeChild(ref.current);
  }, []);

  return createPortal(<>{children}</>, ref.current);
};

export default Portal;
