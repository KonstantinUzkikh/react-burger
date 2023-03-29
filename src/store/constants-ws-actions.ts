import { WS_CONNECT, WS_DISCONNECT, WS_OPENED, WS_CLOSED, WS_GET_ERROR, WS_GET_MESSAGE } from "./action-types";
import {
  WS_AUTH_CONNECT, WS_AUTH_DISCONNECT, WS_AUTH_OPENED, WS_AUTH_CLOSED, WS_AUTH_GET_ERROR, WS_AUTH_GET_MESSAGE
} from "./action-types";

export const wsAllActions = {
  toConnect: WS_CONNECT,
  toDisconnect: WS_DISCONNECT,
  onOpen: WS_OPENED,
  onClose: WS_CLOSED,
  onError: WS_GET_ERROR,
  onMessage: WS_GET_MESSAGE
};

export const wsAuthActions = {
  toConnect: WS_AUTH_CONNECT,
  toDisconnect: WS_AUTH_DISCONNECT,
  onOpen: WS_AUTH_OPENED,
  onClose: WS_AUTH_CLOSED,
  onError: WS_AUTH_GET_ERROR,
  onMessage: WS_AUTH_GET_MESSAGE
};

export type TypeWSAllActions = typeof wsAllActions;

export type TypeWSAuthActions = typeof wsAuthActions;
