import { TWSMessage } from '../../services/types-responses';
import {
  WS_AUTH_CONNECTION_START, WS_AUTH_CONNECTION_STOP, WS_AUTH_CONNECTION_OPENED,
  WS_AUTH_CONNECTION_CLOSED, WS_AUTH_CONNECTION_ERROR, WS_AUTH_GET_MESSAGE, WS_AUTH_RESET_ORDERS,
  IWSAuthConnectionStart, IWSAuthConnectionStop, IWSAuthConnectionOpened,
  IWSAuthConnectionClosed, IWSAuthConnectionError, IWSAuthGetMessage, IWSAuthResetOrders
} from '../action-types';

export const wsAuthConnectionStart = (): IWSAuthConnectionStart => { return { type: WS_AUTH_CONNECTION_START } };

export const wsAuthConnectionStop = (): IWSAuthConnectionStop => { return { type: WS_AUTH_CONNECTION_STOP } };

export const wsAuthConnectionOpened = (): IWSAuthConnectionOpened => { return { type: WS_AUTH_CONNECTION_OPENED } };

export const wsAuthConnectionClosed = (): IWSAuthConnectionClosed => { return { type: WS_AUTH_CONNECTION_CLOSED } };

export const wsAuthConnectionError = (error: any): IWSAuthConnectionError => {
  return {
    type: WS_AUTH_CONNECTION_ERROR,
    error
  };
};

export const wsAuthGetMessage = (data: TWSMessage): IWSAuthGetMessage => {
  return {
    type: WS_AUTH_GET_MESSAGE,
    orders: data.orders,
    total: data.total,
    totalToday: data.totalToday
    };
};

export const wsAuthResetOrders = (): IWSAuthResetOrders => { return { type: WS_AUTH_RESET_ORDERS } };
