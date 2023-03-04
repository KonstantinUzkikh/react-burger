import { GET_PROFILE_SUCCESS, RESET_PROFILE, type TProfilelAction } from '../actions/profile';

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

export const profileReducer = (state = initialState, action: TProfilelAction): TProfileState => {
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
      case RESET_PROFILE: {
        return {
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
