import {
  WS_CONNECTION_START, WS_CONNECTION_STOP, WS_CONNECTION_OPENED, WS_CONNECTION_CLOSED, WS_GET_MESSAGE
} from "./action-types";
import {
  WS_AUTH_CONNECTION_START, WS_AUTH_CONNECTION_STOP, WS_AUTH_CONNECTION_OPENED,
  WS_AUTH_CONNECTION_CLOSED, WS_AUTH_GET_MESSAGE
} from "./action-types";

export const wsActions = {
  wsStart: WS_CONNECTION_START,
  wsStop: WS_CONNECTION_STOP,
  onOpen: WS_CONNECTION_OPENED,
  onClose: WS_CONNECTION_CLOSED,
  onMessage: WS_GET_MESSAGE
};

export const wsAuthActions = {
  wsStart: WS_AUTH_CONNECTION_START,
  wsStop: WS_AUTH_CONNECTION_STOP,
  onOpen: WS_AUTH_CONNECTION_OPENED,
  onClose: WS_AUTH_CONNECTION_CLOSED,
  onMessage: WS_AUTH_GET_MESSAGE
};

export type TypeWSActions = typeof wsActions;

export type TypeWSAuthActions = typeof wsAuthActions;
