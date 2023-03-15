export const RESET_REQUEST: 'RESET_REQUEST' = 'RESET_REQUEST';
export const SEND_REQUEST: 'SEND_REQUEST' = 'SEND_REQUEST';
export const GET_SUCCESS: 'GET_SUCCESS' = 'GET_SUCCESS';
export const GET_FAILED: 'GET_FAILED' = 'GET_FAILED';

export interface IResetRequest {
  readonly type: typeof RESET_REQUEST;
};

export interface ISendRequest {
  readonly type: typeof SEND_REQUEST;
  readonly source: string;
};

export interface IGetSuccess {
  readonly type: typeof GET_SUCCESS;
  readonly successMsg: string;
};

export interface IGetFaild {
  readonly type: typeof GET_FAILED;
  readonly errorMsg: string;
};

export type TApiActions = IResetRequest | ISendRequest | IGetSuccess | IGetFaild;
