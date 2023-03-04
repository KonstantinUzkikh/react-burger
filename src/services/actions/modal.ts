import { setType } from './common';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export type TModalAction = {
  type: typeof OPEN_MODAL | typeof CLOSE_MODAL;
  title?: string;
  modalContent?: string;
  cancelContentFunc?: (() => void) | null;
};

export type TModalProps = Omit<TModalAction, 'type'>;

export const openModal =
  (title: string | undefined, modalContent: string | undefined, cancelContentFunc?: (() => void) | null): TModalAction => {
    return {
      type: OPEN_MODAL,
      title: title,
      modalContent: modalContent !== undefined ? modalContent : '',
      cancelContentFunc: cancelContentFunc !== undefined ? cancelContentFunc : null
    }
  };

export const closeModal = () => setType(CLOSE_MODAL);
