import { TWSMessage } from '../../services/types-responses';
import {
  WS_CONNECTION_START, WS_CONNECTION_STOP, WS_CONNECTION_OPENED, WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE, WS_RESET_ORDERS,
  IWSConnectionStart, IWSConnectionStop, IWSConnectionOpened, IWSConnectionClosed,
  IWSGetMessage, IWSResetOrders
} from '../action-types';

export const wsConnectionStart = (): IWSConnectionStart => { return { type: WS_CONNECTION_START } };

export const wsConnectionStop = (): IWSConnectionStop => { return { type: WS_CONNECTION_STOP } };

export const wsConnectionOpened = (): IWSConnectionOpened => { return { type: WS_CONNECTION_OPENED } };

export const wsConnectionClosed = (): IWSConnectionClosed => { return { type: WS_CONNECTION_CLOSED } };

export const wsGetMessage = (data: TWSMessage): IWSGetMessage => {
  return {
    type: WS_GET_MESSAGE,
    orders: data.orders,
    total: data.total,
    totalToday: data.totalToday
  };
};

export const wsResetOrders = (): IWSResetOrders => { return { type: WS_RESET_ORDERS } };
