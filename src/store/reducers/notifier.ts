import {
  RESET_NOTIFIER, API_FLAG_UP, API_FLAG_DOWN, API_ERROR, WS_FLAG_UP, WS_FLAG_DOWN, WS_ERROR, ERROR,
  type TNotifierActions
} from '../action-types';

export type TApiState = {
  source: string;
  isAPI: boolean;
  isWS: boolean;
  isError: boolean;
  isMessage: boolean;
  error: string | Event | undefined;
  message: string | undefined;
};

const initialState: TApiState = {
  source: '',
  isAPI: false,
  isWS: false,
  isError: false,
  isMessage: false,
  error: '',
  message: '',
};

export const notifierReducer = (state = initialState, action: TNotifierActions): TApiState => {
  switch (action.type) {
    case RESET_NOTIFIER: {
      return initialState;
    }
    case API_FLAG_UP: {
      return {
        ...state,
        source: action.source,
        isAPI: true,
      };
    }
    case API_FLAG_DOWN: {
      let isMessage = false;
      if (action.message !== '') isMessage = true;
      return {
        ...state,
        isAPI: false,
        isMessage: isMessage,
        message: action.message
      };
    }
    case API_ERROR: {
      return {
        ...state,
        isAPI: false,
        isError: true,
        error: action.error
      };
    }
    case WS_FLAG_UP:
      return {
        ...state,
        source: action.source,
        isWS: true
      };
    case WS_FLAG_DOWN:
      return {
        ...state,
        isWS: false
      };
    case WS_ERROR:
      return {
        ...state,
        isError: true,
        isWS: false,
        error: action.error,
      };
    case ERROR:
      return {
        ...state,
        isError: true,
        error: action.error,
      };
    default: {
      return state;
    }
  }
};
