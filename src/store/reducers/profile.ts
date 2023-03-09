import { GET_PROFILE_SUCCESS, PROFILE_RESET, type TProfileActions } from '../action-types';

export type TProfileState = {
  isLoadProfile: boolean;
  email: string;
  name: string;
  password: string;
};

const initialState: TProfileState  = {
  isLoadProfile: false,
  name: '',
  email: '',
  password: ''
};

export const profileReducer = (state = initialState, action: TProfileActions): TProfileState => {
    switch (action.type) {
      case GET_PROFILE_SUCCESS: {
        return {
          ...state,
          isLoadProfile: true,
          name: action.name,
          email: action.email,
          password: action.password
        };
      }
      case PROFILE_RESET: {
        return {    // ЗАМЕНИТЬ НА initialState
          ...state,
          isLoadProfile: false,
          name: '',
          email: '',
          password: ''
        };
      }
      default: {
        return state;
      }
    }
  };
