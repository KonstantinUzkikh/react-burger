import {
  SET_PROFILE_FORM_VALUE,
  SET_INPUTS,
  CANCEL_INPUTS
} from '../actions/form';

const initialState = {
  name: '',
  email: '',
  password: '',
  newPassword: '',
  code: ''
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_FORM_VALUE: {
      return {
        ...state,
        [action.field]: action.value
      };
    }
    case SET_INPUTS: {
      return {
        ...state,
        name: action.name,
        email: action.email,
        password: action.password
      };
    }
    case CANCEL_INPUTS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
