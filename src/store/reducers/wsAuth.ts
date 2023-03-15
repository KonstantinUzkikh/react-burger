import { WS_AUTH_CONNECTION_ERROR, WS_AUTH_GET_MESSAGE, WS_AUTH_RESET_ORDERS } from '../action-types';
import type { TWSAuthActions } from '../action-types';
import { TOrder } from '../../services/types-responses';

type TWSState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  error?: Event;
}

const initialState: TWSState = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const wsAuthReducer = (state = initialState, action: TWSAuthActions): TWSState => {
  switch (action.type) {
    case WS_AUTH_CONNECTION_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case WS_AUTH_GET_MESSAGE:
      return {
        ...state,
        orders: action.orders,
        total: action.total,
        totalToday: action.totalToday
      };
      case WS_AUTH_RESET_ORDERS:
        return {
          ...state,
          orders: [],
          total: 0,
          totalToday: 0
        };
      default:
      return state;
  }
};
