import { setType } from './common';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (title, modalContent, cancelContentFunc) => {
  return {
    type: OPEN_MODAL,
    title: title,
    modalContent: modalContent !== undefined ? modalContent : '',
    cancelContentFunc: cancelContentFunc !== undefined ? cancelContentFunc : null
  }
};

export const closeModal = () => setType(CLOSE_MODAL);
