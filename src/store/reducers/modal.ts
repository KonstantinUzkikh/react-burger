import { OPEN_MODAL, CLOSE_MODAL, type TModalActions} from '../action-types';

export type TModalState = {
  isModalOpen: boolean;
  title: string | undefined;
  modalContent: string | undefined;
  cancelContentFunc?: (() => void) | null;
};

const initialState: TModalState  = {
  isModalOpen: false,
  title: '',
  modalContent: '',
  cancelContentFunc: null
};

export const modalReducer = (state = initialState, action: TModalActions): TModalState => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        isModalOpen: true,
        title: action.title,
        modalContent: action.modalContent,
        cancelContentFunc: action.cancelContentFunc
      };
    }
    case CLOSE_MODAL: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
