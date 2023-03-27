import { TWSMessage } from '../../services/types-responses';
import { TOrdersData } from '../../utils';
import {
  WS_AUTH_CONNECT, WS_AUTH_DISCONNECT, WS_AUTH_OPENED, WS_AUTH_CLOSED, WS_AUTH_GET_ERROR,
  WS_AUTH_GET_MESSAGE, WS_AUTH_GET_ORDERS, WS_AUTH_RESET_ORDERS,
  IWSAuthConnect, IWSAuthDisConnect, IWSAuthOpened, IWSAuthClosed, IWSAuthGetError,
  IWSAuthGetMessage, IWSAuthGetOrders, IWSAuthResetOrders
} from '../action-types';

export const wsAuthConnect = (options: string): IWSAuthConnect => {
  return {
    type: WS_AUTH_CONNECT,
    payload: options
  }
};

export const wsAuthDisConnect = (): IWSAuthDisConnect => ({ type: WS_AUTH_DISCONNECT });

export const wsAuthOpened = (): IWSAuthOpened => ({ type: WS_AUTH_OPENED });

export const wsAuthClosed = (): IWSAuthClosed => ({ type: WS_AUTH_CLOSED });

export const wsAuthGetError = (): IWSAuthGetError => ({ type: WS_AUTH_GET_ERROR });

export const wsAuthResetOrders = (): IWSAuthResetOrders => ({ type: WS_AUTH_RESET_ORDERS });

export const wsAuthGetMessage = (message: TWSMessage): IWSAuthGetMessage => {
  return {
    type: WS_AUTH_GET_MESSAGE,
    message
  };
};

export const wsAuthGetOrders = (data: TOrdersData): IWSAuthGetOrders => {
  return {
    type: WS_AUTH_GET_ORDERS,
    data
  };
};
