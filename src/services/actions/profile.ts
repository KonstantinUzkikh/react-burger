import { setType } from './common';
import type { TUser } from '../../utils/types'

export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const RESET_PROFILE = 'RESET_PROFILE';

export type TProfilelAction = {
  type: typeof GET_PROFILE_SUCCESS | typeof RESET_PROFILE;
  name: string;
  email: string;
  password: string;
};

export const getProfileSuccess = (user: TUser, password: string) => {
  return {
    type: GET_PROFILE_SUCCESS,
    name: user.name,
    email: user.email,
    password: password
  }
};

export const resetProfile = () => setType(RESET_PROFILE);

