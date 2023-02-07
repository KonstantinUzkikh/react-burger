import {
  OPEN_MODAL,
  CLOSE_MODAL
}
from '../actions/modal';

const initialState = {
  isModalOpen: false,
  title: '',
  modalContent: '',
  cancelContentFunc: null
};

export const modalReducer = (state = initialState, action) => {
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
