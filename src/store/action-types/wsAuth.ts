import { TOrder } from "../../services/types-responses";

export const WS_AUTH_CONNECTION_START: 'WS_AUTH_CONNECTION_START' = 'WS_AUTH_CONNECTION_START';
export const WS_AUTH_CONNECTION_STOP: 'WS_AUTH_CONNECTION_STOP' = 'WS_AUTH_CONNECTION_STOP';
export const WS_AUTH_CONNECTION_OPENED: 'WS_AUTH_CONNECTION_OPENED' = 'WS_AUTH_CONNECTION_OPENED';
export const WS_AUTH_CONNECTION_CLOSED: 'WS_AUTH_CONNECTION_CLOSED' = 'WS_AUTH_CONNECTION_CLOSED';
export const WS_AUTH_GET_MESSAGE: 'WS_AUTH_GET_MESSAGE' = 'WS_AUTH_GET_MESSAGE';
export const WS_AUTH_RESET_ORDERS: 'WS_AUTH_RESET_ORDERS' = 'WS_AUTH_RESET_ORDERS';

export interface IWSAuthConnectionStart {
  readonly type: typeof WS_AUTH_CONNECTION_START;
};

export interface IWSAuthConnectionStop {
  readonly type: typeof WS_AUTH_CONNECTION_STOP;
};

export interface IWSAuthConnectionOpened {
  readonly type: typeof WS_AUTH_CONNECTION_OPENED;
}

export interface IWSAuthConnectionClosed {
  readonly type: typeof WS_AUTH_CONNECTION_CLOSED;
}

export interface IWSAuthGetMessage {
  readonly type: typeof WS_AUTH_GET_MESSAGE;
  readonly orders: TOrder[];
  readonly total: number;
  readonly totalToday: number;
}

export interface IWSAuthResetOrders {
  readonly type: typeof WS_AUTH_RESET_ORDERS;
}

export type TWSAuthActions = IWSAuthConnectionStart | IWSAuthConnectionStop | IWSAuthConnectionOpened
  | IWSAuthConnectionClosed | IWSAuthGetMessage | IWSAuthResetOrders;
