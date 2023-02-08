import { setType } from './common';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (title, modalContent, cancelContentFunc) => {
  return {
    type: OPEN_MODAL,
    title: title,
    modalContent: modalContent !== undefined ? modalContent : undefined,
    cancelContentFunc: cancelContentFunc !== undefined ? cancelContentFunc : undefined
  }
};

export const closeModal = () => setType(CLOSE_MODAL);
