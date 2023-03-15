import type { Middleware } from 'redux';

import { WS_BASE_URL, wsEndPointAll } from '../../utils/constants';
import type { TAppActions } from '../types-store';
import { sendRequest, getSuccess, getFaild } from '../actions';
import { getAccessToken } from '../../services/get-data';
import { TOrder, TWSMessage } from '../../services/types-responses';
import { TypeWSActions, TypeWSAuthActions } from '../constants-ws-actions';

export const wsMiddleware = (url: string, withAuth: boolean, wsActions: TypeWSActions | TypeWSAuthActions): Middleware => {
  return store => {

    let socket: WebSocket | null = null;

    return next => (action: TAppActions) => {

      const { dispatch, getState } = store;
      const { type } = action;
      const { wsStart, wsStop, onOpen, onClose, onError, onMessage } = wsActions;
      const { arrID } = getState().ingredients;

      async function startAuthWebSocket() {
        let accessToken = await getAccessToken();
        if (typeof (accessToken) === 'string') accessToken = accessToken.slice('Bearer '.length)
        socket = new WebSocket(`${url}?token=${accessToken}`);
      }

      if (type === wsStart) {
        dispatch(sendRequest('orders'));
        withAuth ? startAuthWebSocket() : socket = new WebSocket(url);
      }

      if (type === wsStop && socket && socket.readyState === 1) {
        socket.close(1000, 'прекращаем получение данных');
      }

      if (socket) {

        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen });
          dispatch(getSuccess());
        };

        socket.onerror = (event: Event) => {
          dispatch({ type: onError, error: event });
          dispatch(getFaild('Ошибка сокета'))
        };

        socket.onmessage = (event: MessageEvent) => {
          if (socket && socket.readyState === 1) {
            const { data } = event;
            let message: TWSMessage = JSON.parse(data);
            // избавляемся от заказов с несуществующими _id инредиентов
            const orders: TOrder[] = message.orders.filter(it => it.ingredients.every(item => arrID.includes(item))) || [];
            dispatch({ type: onMessage, orders: orders, total: message.total, totalToday: message.totalToday });
          }
        };

        socket.onclose = event => {
          dispatch({ type: onClose });
        };
      }

      next(action);
    }
  }
};
