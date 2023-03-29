import { TWSMessage } from "../../services/types-responses";
import { TOrdersData } from '../../utils/types-data';

export const WS_CONNECT: 'WS_CONNECT' = 'WS_CONNECT';
export const WS_DISCONNECT: 'WS_DISCONNECT' = 'WS_DISCONNECT';
export const WS_OPENED: 'WS_OPENED' = 'WS_OPENED';
export const WS_CLOSED: 'WS_CLOSED' = 'WS_CLOSED';
export const WS_GET_ERROR: 'WS_GET_ERROR' = 'WS_GET_ERROR';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';
export const WS_RESET_ORDERS: 'WS_RESET_ORDERS' = 'WS_RESET_ORDERS';

export interface IWSConnect {
  readonly type: typeof WS_CONNECT;
  readonly payload: string;
};

export interface IWSDisConnect {
  readonly type: typeof WS_DISCONNECT;
};

export interface IWSOpened {
  readonly type: typeof WS_OPENED;
}

export interface IWSClosed {
  readonly type: typeof WS_CLOSED;
}

export interface IWSGetError {
  readonly type: typeof WS_GET_ERROR;
}

export interface IWSGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly message: TWSMessage;
}

export interface IWSGetOrders {
  readonly type: typeof WS_GET_ORDERS;
  readonly data: TOrdersData;
}
export interface IWSResetOrders {
  readonly type: typeof WS_RESET_ORDERS;
}

export type TWSActions = IWSConnect | IWSDisConnect | IWSOpened | IWSClosed | IWSGetError
  | IWSGetMessage | IWSGetOrders | IWSResetOrders;
