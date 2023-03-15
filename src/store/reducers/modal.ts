import { OPEN_MODAL, CLOSE_MODAL, type TModalActions} from '../action-types';
import { AppDispatch } from '../../store/types-store';

export type TModalState = {
  isModalOpen: boolean;
  title: string | undefined;
  modalContent: string | undefined;
  resetContentFunc?: (() => void) | null;
};

const initialState: TModalState  = {
  isModalOpen: false,
  title: '',
  modalContent: '',
  resetContentFunc: null
};

export const modalReducer = (state = initialState, action: TModalActions): TModalState => {
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
      return initialState;
    }
    default: {
      return state;
    }
  }
};
