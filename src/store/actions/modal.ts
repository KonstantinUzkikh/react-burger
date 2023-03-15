import { OPEN_MODAL, CLOSE_MODAL, IOpenModalAction, ICloseModalAction } from '../action-types';
import { AppDispatch } from '../../store/types-store';

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

export const closeModal = (): ICloseModalAction => { return {type: CLOSE_MODAL} };
