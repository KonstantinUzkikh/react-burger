import {
  MODAL_OPEN,
  MODAL_CLOSE
}
from '../actions/modal';

const initialState = {
  isModalOpen: false,
  title: '',
  modalContent: '',
  setCancelContent: null
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN: {
      return {
        ...state,
        isModalOpen: true,
        title: action.title,
        modalContent: action.modalContent,
        setCancelContent: action.setCancelContent
      };
    }
    case MODAL_CLOSE: {
      return {
        state: initialState
      };
    }
    default: {
      return state;
    }
  }
};
