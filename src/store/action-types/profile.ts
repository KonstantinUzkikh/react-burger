export const GET_PROFILE_SUCCESS: 'GET_PROFILE_SUCCESS' = 'GET_PROFILE_SUCCESS';
export const PROFILE_RESET: 'PROFILE_RESET' = 'PROFILE_RESET';

export interface IProfilelSuccessAction {
  readonly type: typeof GET_PROFILE_SUCCESS;
  readonly name: string;
  readonly email: string;
  readonly password: string;
};

export interface IProfileResetAction {
  readonly type: typeof PROFILE_RESET;
}

export type TProfileActions = IProfilelSuccessAction | IProfileResetAction;
