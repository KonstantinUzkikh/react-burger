import { FC, ReactElement } from 'react';

import overlayLayout from './modal-overlay.module.css';

const ModalOverlay: FC<{children: ReactElement; onClose: () => void}> = ({ onClose, children }) =>
{
  return (
    <div className={overlayLayout.boxMain} onClick={onClose}>
      {children}
    </div>
  )
}

export default ModalOverlay
