export const RESET_NOTIFIER: 'RESET_NOTIFIER' = 'RESET_NOTIFIER';
export const API_FLAG_UP: 'API_FLAG_UP' = 'API_FLAG_UP';
export const API_FLAG_DOWN: 'API_FLAG_DOWN' = 'API_FLAG_DOWN';
export const API_ERROR: 'API_ERROR' = 'API_ERROR';
export const WS_FLAG_UP: 'WS_FLAG_UP' = 'WS_FLAG_UP';
export const WS_FLAG_DOWN: 'WS_FLAG_DOWN' = 'WS_FLAG_DOWN';
export const WS_ERROR: 'WS_ERROR' = 'WS_ERROR';
export const ERROR: 'ERROR' = 'ERROR';

export interface IResetNotifier {
  readonly type: typeof RESET_NOTIFIER;
};

export interface IApiFlagUp {
  readonly type: typeof API_FLAG_UP;
  readonly source: string;
};

export interface IApiFlagDown {
  readonly type: typeof API_FLAG_DOWN;
  readonly message: string;
};

export interface IApiError {
  readonly type: typeof API_ERROR;
  readonly error: string;
};

export interface IWSFlagUp {
  readonly type: typeof WS_FLAG_UP;
  readonly source: string;
}

export interface IWSFlagDown {
  readonly type: typeof WS_FLAG_DOWN;
}

export interface IWSError {
  readonly type: typeof WS_ERROR;
  readonly error: Event;
}

export interface IError {
  readonly type: typeof ERROR;
  readonly error: string;
}

export type TNotifierActions = IResetNotifier | IApiFlagUp | IApiFlagDown | IApiError | IWSFlagUp
  | IWSFlagDown | IWSError | IError;
