import React, { useEffect, useCallback } from 'react';
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { CloseIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';
import modalLayout from './modal.module.css';

import { closeModal } from '../../services/actions/modal';

function Modal({ title, ...props }) {

  const dispatch = useDispatch();

  const { cancelContentFunc } = useSelector(state => state.modal);

  const onClose = useCallback(() => {
    dispatch(cancelContentFunc());
    dispatch(closeModal());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const escCloseModal = (evt) => { if (evt.key === 'Escape') {onClose()} }
    document.addEventListener('keydown', escCloseModal);
    return () => {
      document.removeEventListener('keydown', escCloseModal)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={modalLayout.boxMain} onClick={(evt) => evt.stopPropagation()}>
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
