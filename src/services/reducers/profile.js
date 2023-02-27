import {
  //CANCEL_PROFILE_STATE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILED
} from '../actions/profile';

const initialState = {
  isLoadingProfile: false,
  hasErrorProfile: false,
  errorProfile: '',
  hasMessageProfile: false,
  messageProfile: '',
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
  //  case CANCEL_PROFILE_STATE: {
  //    return initialState;
  //  }
  //  case GET_PROFILE_REQUEST: {
  //    return {
  //      ...state,
  //      isLoadingProfile: true,
  //      hasErrorProfile: false
  //    };
  //  }
  //  case GET_PROFILE_SUCCESS: {
  //    let hasMessage = false;
  //    if (action.message !== '') hasMessage = true;
  //    return {
  //      ...state,
  //      isLoadingProfile: false,
  //      hasErrorProfile: false,
  //      hasMessageProfile: hasMessage,
  //      messageProfile: action.message
  //    };
  //  }
  //  case GET_PROFILE_FAILED: {
  //    return {
  //      ...state,
  //      isLoadingProfile: false,
  //      hasErrorProfile: true,
  //      errorProfile: action.error
  //    };
  //  }
    default: {
      return state;
    }
  }
};
