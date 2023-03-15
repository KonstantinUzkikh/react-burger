import { WS_CONNECTION_ERROR, WS_GET_MESSAGE, WS_RESET_ORDERS } from '../action-types';
import type { TWSActions } from '../action-types';
import type { TOrder } from '../../services/types-responses'

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

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.orders,
        total: action.total,
        totalToday: action.totalToday
      };
    case WS_RESET_ORDERS:
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
