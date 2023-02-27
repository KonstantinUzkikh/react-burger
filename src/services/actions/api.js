import { setType } from './common';

export const RESET_REQUEST = 'CANCEL_STATE';
export const SEND_REQUEST = 'GET_REQUEST';
export const GET_SUCCESS = 'GET_SUCCESS';
export const GET_FAILED = 'GET_FAILED';

export const resetRequest = () => setType(RESET_REQUEST);

export const sendRequest = (source = '') => {
  return {
    type: SEND_REQUEST,
    source: source
  }
};

export const getSuccess = (successMsg = '') => {
  return {
    type: GET_SUCCESS,
    successMsg: successMsg
  }
};

export const getFaild = (errorMsg = '') => {
  return {
    type: GET_FAILED,
    errorMsg: errorMsg
  }
};
