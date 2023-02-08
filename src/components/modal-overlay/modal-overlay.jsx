import React from 'react';
import PropTypes from 'prop-types';

import overlayLayout from './modal-overlay.module.css';

function ModalOverlay({ onClose, ...props }) {

  return (
    <div className={overlayLayout.boxMain} onClick={onClose}>
      {props.children}
    </div>
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element
};

export default ModalOverlay
