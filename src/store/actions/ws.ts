import { TWSMessage } from '../../services/types-responses';
import { TOrdersData } from '../../utils';
import {
  WS_CONNECT, WS_DISCONNECT, WS_OPENED, WS_CLOSED, WS_GET_ERROR, WS_GET_MESSAGE, WS_GET_ORDERS, WS_RESET_ORDERS,
  IWSConnect, IWSDisConnect, IWSOpened, IWSClosed, IWSGetError, IWSGetMessage, IWSGetOrders, IWSResetOrders,
} from '../action-types';

export const wsConnect = (options: string): IWSConnect => {
  return {
    type: WS_CONNECT,
    payload: options
  }
};

export const wsDisConnect = (): IWSDisConnect => ({ type: WS_DISCONNECT });

export const wsOpened = (): IWSOpened => ({ type: WS_OPENED });

export const wsClosed = (): IWSClosed => ({ type: WS_CLOSED });

export const wsGetError = (): IWSGetError => ({ type: WS_GET_ERROR });

export const wsResetOrders = (): IWSResetOrders => ({ type: WS_RESET_ORDERS });

export const wsGetMessage = (message: TWSMessage): IWSGetMessage => {
  debugger
  return {
    type: WS_GET_MESSAGE,
    message
  };
};

export const wsGetOrders = (data: TOrdersData): IWSGetOrders => {
  return {
    type: WS_GET_ORDERS,
    data
  };
};
