import React from 'react';
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { CloseIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';
import modalLayout from './modal.module.css';

import { MODAL_CLOSE } from '../../services/actions/modal';

function Modal({ title, ...props }) {

  const dispatch = useDispatch();

  const { setCancelContent } = useSelector(state => state.modal);

  const onClose = () => {
    dispatch(setCancelContent());
    dispatch({
      type: MODAL_CLOSE
    });
  }

  const keyboardListener = React.useEffect(() => {
    const escCloseModal = (evt) => { if (evt.key === 'Escape') {onClose()} }
    document.addEventListener('keydown', escCloseModal);
    return () => {
      document.removeEventListener('keydown', escCloseModal)
    }
  }, []);

  return ReactDOM.createPortal(
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
    </ModalOverlay>,
    document.getElementById('modal')
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element
};

export default Modal
