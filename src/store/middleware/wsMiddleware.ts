import type { Middleware } from 'redux';

import type { TAppActions } from '../types-store';
import { TypeWSAllActions, TypeWSAuthActions } from '../constants-ws-actions';

export const wsMiddleware = (wsUrl: string, wsActions: TypeWSAllActions | TypeWSAuthActions): Middleware => {
  return store => next => (action: TAppActions) => {

    const { dispatch } = store;
    const { type } = action;
    const { toConnect, toDisconnect, onOpen, onClose, onError, onMessage } = wsActions;

    let socket: WebSocket | null = null;

    if (type === toConnect && !socket) {
      socket = new WebSocket(`${wsUrl}${action.payload}`);
    }

    if (type === toDisconnect && socket && socket.readyState === 1) {
      socket.close(1000, 'прекращаем получение данных');
    }

    if (socket) {

      socket.onopen = (event: Event) => dispatch({ type: onOpen });

      socket.onerror = (event: Event) => dispatch({ type: onError });

      socket.onmessage = (event: MessageEvent) => {
        if (socket && socket.readyState === 1) {
          dispatch({ type: onMessage, message: JSON.parse(event.data) });
        } else {
          dispatch({ type: onError });
        }
      }

      socket.onclose = (event: Event) => {
        dispatch({ type: onClose });
        socket = null;
      };
    }

    next(action);
  }
};
