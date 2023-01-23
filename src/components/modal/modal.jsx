import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { CloseIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import modalLayout from './modal.module.css';

function Modal({ title, isActive, setIsActive, ...props }) {
  return (
    <div className={modalLayout.box}>
      <div className={modalLayout.titleBox}>
        <button className={modalLayout.buttonClose} href='#' type="button" onClick={() => setIsActive(false)}>
          <CloseIcon type="primary" />
        </button>
        <h3 className="text text_type_main-large" style={{display: 'flex', alignContent: 'left'}} >{props.title}</h3>
      </div>
      <div className={modalLayout.children}>
        {props.children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
  children: PropTypes.element.isRequired
};

export default Modal
