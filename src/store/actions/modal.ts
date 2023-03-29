import { OPEN_MODAL, CLOSE_MODAL, IOpenModalAction, ICloseModalAction } from '../action-types';

export const openModal =
  (title: string | undefined, modalContent: string | undefined,
    resetContentFunc?: (() => void) | null): IOpenModalAction => {
    return {
      type: OPEN_MODAL,
      title: title !== undefined ? title : '',
      modalContent: modalContent !== undefined ? modalContent : '',
      resetContentFunc: resetContentFunc !== undefined ? resetContentFunc : null
    }
};

export const closeModal = (): ICloseModalAction => ({type: CLOSE_MODAL});
