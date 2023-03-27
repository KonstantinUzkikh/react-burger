import { WS_AUTH_GET_MESSAGE, WS_AUTH_RESET_ORDERS, TWSAuthActions } from '../action-types';
import type { TOrder } from '../../utils/types-data'

type TWSState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

export const initialWSAuthState: TWSState = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const wsAuthReducer = (state = initialWSAuthState, action: TWSAuthActions): TWSState => {
  switch (action.type) {
    case WS_AUTH_GET_MESSAGE: {
      return {
        ...state,
        orders: action.message.orders,
        total: action.message.total,
        totalToday: action.message.totalToday
      }
    }
    case WS_AUTH_RESET_ORDERS: {
      return initialWSAuthState;
    }
    default: {
      return state;
    }
  }
};
