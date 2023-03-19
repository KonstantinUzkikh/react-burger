import type { Middleware } from 'redux';

import type { TAppActions } from '../types-store';
import { wsFlagUp, wsFlagDown, wsError } from '../actions';
import { getAccessToken } from '../../services/get-data';
import { TOrder, TWSMessage } from '../../services/types-responses';
import { TypeWSActions, TypeWSAuthActions } from '../constants-ws-actions';
import { TIngredient } from '../../utils';

export const wsMiddleware = (url: string, withAuth: boolean, wsActions: TypeWSActions | TypeWSAuthActions): Middleware => {
  return store => {

    let socket: WebSocket | null = null;
    let isSocket = false;

    return next => (action: TAppActions) => {

      const { dispatch, getState } = store;
      const { type } = action;
      const { wsStart, wsStop, onOpen, onClose, onMessage } = wsActions;

      const { ingredients } = getState().ingredients;

      const arrID: string[] = ingredients.map((item: TIngredient) => item._id);

      async function startAuthWebSocket() {
        dispatch(wsFlagUp('orders'));
        let accessToken = await getAccessToken();
        if (typeof (accessToken) === 'string') accessToken = accessToken.slice('Bearer '.length)
        if (!isSocket) { socket = new WebSocket(`${url}?token=${accessToken}`); isSocket = true }
      }

      if (type === wsStart && !isSocket) {
        if (withAuth) startAuthWebSocket()
        else {
          dispatch(wsFlagUp('orders'));
          socket = new WebSocket(url); isSocket = true;
        }
      }

      if (type === wsStop && socket && socket.readyState === 1) {
        socket.close(1000, 'прекращаем получение данных');
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen });
          dispatch(wsFlagDown());
        };

        socket.onerror = (event: Event) => {
          dispatch(wsError(event));
        };

        socket.onmessage = (event: MessageEvent) => {
          if (socket && socket.readyState === 1) {
            const { data } = event;
            let message: TWSMessage = JSON.parse(data);

            // избавляемся от заказов с несуществующими _id инредиентов
            if (message.orders?.length > 0) {
              const orders: TOrder[] = message.orders.filter(it => it.ingredients.every(item => arrID.includes(item))) || [];
              dispatch({ type: onMessage, orders: orders, total: message.total, totalToday: message.totalToday });
            }
          }
        };

        socket.onclose = event => {
          dispatch({ type: onClose });
          socket = null;
          isSocket = false;
        };
      }

      next(action);
    }
  }
};
