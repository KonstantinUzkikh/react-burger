import {
  RESET_NOTIFIER, API_FLAG_UP, API_FLAG_DOWN, API_ERROR, WS_FLAG_UP, WS_FLAG_DOWN, WS_ERROR, ERROR,
  IResetNotifier, IApiFlagUp, IApiFlagDown, IApiError, IWSFlagUp, IWSFlagDown, IWSError, IError
} from '../action-types';

export const resetNotifier = (): IResetNotifier => { return { type: RESET_NOTIFIER } };

export const apiFlagUp = (source: string = ''): IApiFlagUp => {
  return {
    type: API_FLAG_UP,
    source
  }
};

export const apiFlagDown = (message: string = ''): IApiFlagDown => {
  return {
    type: API_FLAG_DOWN,
    message
  }
};

export const apiError = (error: string = ''): IApiError => {
  return {
    type: API_ERROR,
    error
  }
};

export const wsFlagUp = (source: string = ''): IWSFlagUp => {
  return {
    type: WS_FLAG_UP,
    source
  }
};

export const wsFlagDown = (): IWSFlagDown => { return { type: WS_FLAG_DOWN } };

export const wsError = (error: Event): IWSError => {
  return {
    type: WS_ERROR,
    error
  };
};

export const error = (error: string): IError => {
  return {
    type: ERROR,
    error
  };
};
