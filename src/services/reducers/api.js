import {
  RESET_REQUEST, SEND_REQUEST, GET_SUCCESS, GET_FAILED
} from '../actions/api';

const initialState = {
  source: '',
  isLoading: false,
  hasError: false,
  hasMessage: false,
  errorMsg: '',
  successMsg: '',
};

export const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_REQUEST: {
      return initialState;
    }
    case SEND_REQUEST: {
      return {
        ...state,
        source: action.source,
        isLoading: true,
      };
    }
    case GET_SUCCESS: {
      let hasMessage = false;
      if (action.successMsg !== '') hasMessage = true;
      return {
        ...state,
        isLoading: false,
        hasMessage: hasMessage,
        successMsg: action.successMsg
      };
    }
    case GET_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errorMsg: action.errorMsg
      };
    }
    default: {
      return state;
    }
  }
};
