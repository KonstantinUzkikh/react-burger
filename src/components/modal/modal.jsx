import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { CloseIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';
import modalLayout from './modal.module.css';

function Modal({ title, onClose, ...props }) {

  const keyboardListener = React.useEffect(() => {
    const escCloseModal = (evt) => { if (evt.key === 'Escape') {onClose()} }
    document.addEventListener('keydown', escCloseModal);
    return () => {
      document.removeEventListener('keydown', escCloseModal)
    }
  }, []);

  return (
    <>
      <ModalOverlay onClose={onClose}>
        <div className={modalLayout.boxMain} onKeyDown={keyboardListener} onClick={(evt) => evt.stopPropagation()}>
          <div className={modalLayout.boxTitle}>
            <button className={modalLayout.buttonClose} href='#' type="button" onClick={onClose}>
              <CloseIcon type="primary" />
            </button>
            <h3 className="text text_type_main-large">{title}</h3>
          </div>
          <div className={modalLayout.children}>
            {props.children}
          </div>
        </div>
      </ModalOverlay>
    </>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element
};

export default Modal
