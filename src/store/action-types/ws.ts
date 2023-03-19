import { TOrder } from "../../services/types-responses";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_STOP: 'WS_CONNECTION_STOP' = 'WS_CONNECTION_STOP';
export const WS_CONNECTION_OPENED: 'WS_CONNECTION_OPENED' = 'WS_CONNECTION_OPENED';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_RESET_ORDERS: 'WS_RESET_ORDERS' = 'WS_RESET_ORDERS';

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
};

export interface IWSConnectionStop {
  readonly type: typeof WS_CONNECTION_STOP;
};

export interface IWSConnectionOpened {
  readonly type: typeof WS_CONNECTION_OPENED;
}

export interface IWSConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly orders: TOrder[];
  readonly total: number;
  readonly totalToday: number;
}

export interface IWSResetOrders {
  readonly type: typeof WS_RESET_ORDERS;
}

export type TWSActions = IWSConnectionStart | IWSConnectionStop | IWSConnectionOpened
 | IWSConnectionClosed | IWSGetMessage | IWSResetOrders;
