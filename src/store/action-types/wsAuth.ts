import { TWSMessage } from "../../services/types-responses";
import { TOrdersData } from '../../utils/types-data';

export const WS_AUTH_CONNECT: 'WS_AUTH_CONNECT' = 'WS_AUTH_CONNECT';
export const WS_AUTH_DISCONNECT: 'WS_AUTH_DISCONNECT' = 'WS_AUTH_DISCONNECT';
export const WS_AUTH_OPENED: 'WS_AUTH_OPENED' = 'WS_AUTH_OPENED';
export const WS_AUTH_CLOSED: 'WS_AUTH_CLOSED' = 'WS_AUTH_CLOSED';
export const WS_AUTH_GET_ERROR: 'WS_AUTH_GET_ERROR' = 'WS_AUTH_GET_ERROR';
export const WS_AUTH_GET_MESSAGE: 'WS_AUTH_GET_MESSAGE' = 'WS_AUTH_GET_MESSAGE';
export const WS_AUTH_GET_ORDERS: 'WS_AUTH_GET_ORDERS' = 'WS_AUTH_GET_ORDERS';
export const WS_AUTH_RESET_ORDERS: 'WS_AUTH_RESET_ORDERS' = 'WS_AUTH_RESET_ORDERS';

export interface IWSAuthConnect {
  readonly type: typeof WS_AUTH_CONNECT;
  readonly payload: string;
};

export interface IWSAuthDisConnect {
  readonly type: typeof WS_AUTH_DISCONNECT;
};

export interface IWSAuthOpened {
  readonly type: typeof WS_AUTH_OPENED;
}

export interface IWSAuthClosed {
  readonly type: typeof WS_AUTH_CLOSED;
}

export interface IWSAuthGetError {
  readonly type: typeof WS_AUTH_GET_ERROR;
}

export interface IWSAuthGetMessage {
  readonly type: typeof WS_AUTH_GET_MESSAGE;
  readonly message: TWSMessage;
}

export interface IWSAuthGetOrders {
  readonly type: typeof WS_AUTH_GET_ORDERS;
  readonly data: TOrdersData;
}

export interface IWSAuthResetOrders {
  readonly type: typeof WS_AUTH_RESET_ORDERS;
}

export type TWSAuthActions = IWSAuthConnect | IWSAuthDisConnect | IWSAuthOpened | IWSAuthClosed
  | IWSAuthGetError | IWSAuthGetMessage | IWSAuthGetOrders | IWSAuthResetOrders;
