import type { TUser } from '../../utils/types-data';
import {
  GET_PROFILE_SUCCESS, PROFILE_RESET,
  type IProfilelSuccessAction, IProfileResetAction
} from '../action-types';

export const getProfileSuccess = (user: TUser, password: string): IProfilelSuccessAction => {
  return {
    type: GET_PROFILE_SUCCESS,
    name: user.name,
    email: user.email,
    password: password
  }
};

export const profileReset = (): IProfileResetAction => { return { type: PROFILE_RESET }; }
