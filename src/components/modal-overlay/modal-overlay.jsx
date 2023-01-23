import React from 'react';
import PropTypes from 'prop-types';

import overlayLayout from './modal-overlay.module.css';

function ModalOverlay({ isActive, setIsActive, ...props }) {

  React.useEffect(() => {
    document.addEventListener('keydown', escCloseModal);
    return () => {
      document.removeEventListener('keydown', escCloseModal);
    }
  }, []);

  const escCloseModal = (evt) => { if (evt.key === 'Escape') {
    setIsActive(false);
  }}

  return (
    <div
      className={(`${overlayLayout.box} ${isActive ? (`${overlayLayout.open}`) : ('')}`)}
      //className={isActive ? (`${overlayLayout.box} ${overlayLayout.open}`) : (`${overlayLayout.box}`)}
      onKeyDown={escCloseModal}
      onClick={() => setIsActive(false)}
    >
      <div
        className={(`${overlayLayout.content} ${isActive ? (`${overlayLayout.contentActive}`) : ('')}`)}
        //className={isActive ? (`${overlayLayout.content} ${overlayLayout.contentActive}`) : (`${overlayLayout.content}`)}
        onClick={(evt) => evt.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  )
}

ModalOverlay.propTypes = {
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
  children: PropTypes.element
};

export default ModalOverlay
