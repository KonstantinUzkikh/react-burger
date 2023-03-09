import { OPEN_MODAL, CLOSE_MODAL, IOpenModalAction, ICloseModalAction } from '../action-types';

export const openModal =
  (title: string | undefined, modalContent: string | undefined,
    cancelContentFunc?: (() => void) | null): IOpenModalAction => {
    return {
      type: OPEN_MODAL,
      title: title !== undefined ? title : '',
      modalContent: modalContent !== undefined ? modalContent : '',
      cancelContentFunc: cancelContentFunc !== undefined ? cancelContentFunc : null
    }
};

export const closeModal = (): ICloseModalAction => { return {type: CLOSE_MODAL} };

//export type TModalAction = {
//  type: typeof OPEN_MODAL | typeof CLOSE_MODAL;
//  title?: string;
//  modalContent?: string;
//  cancelContentFunc?: (() => void) | null;
//};

//export type TModalProps = Omit<TModalAction, 'type'>;
