import { RESET_REQUEST, SEND_REQUEST, GET_SUCCESS, GET_FAILED,
   IResetRequest, ISendRequest, IGetSuccess, IGetFaild } from '../action-types';

export const resetRequest = ():IResetRequest => { return {type: RESET_REQUEST} };

export const sendRequest = (source:string = ''): ISendRequest => {
  return {
    type: SEND_REQUEST,
    source: source
  }
};

export const getSuccess = (successMsg:string = ''): IGetSuccess => {
  return {
    type: GET_SUCCESS,
    successMsg: successMsg
  }
};

export const getFaild = (errorMsg:string = ''): IGetFaild => {
  return {
    type: GET_FAILED,
    errorMsg: errorMsg
  }
};
