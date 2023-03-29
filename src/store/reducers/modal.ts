import { OPEN_MODAL, CLOSE_MODAL, type TModalActions} from '../action-types';

export type TModalState = {
  isModalOpen: boolean;
  title: string | undefined;
  modalContent: string | undefined;
  resetContentFunc?: (() => void) | null;
};

export const initialModalState: TModalState  = {
  isModalOpen: false,
  title: '',
  modalContent: '',
  resetContentFunc: null
};

export const modalReducer = (state = initialModalState, action: TModalActions): TModalState => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        isModalOpen: true,
        title: action.title,
        modalContent: action.modalContent,
        resetContentFunc: action.resetContentFunc
      };
    }
    case CLOSE_MODAL: {
      return initialModalState;
    }
    default: {
      return state;
    }
  }
};
