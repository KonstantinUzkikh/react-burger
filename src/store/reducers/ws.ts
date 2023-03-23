import { WS_GET_MESSAGE, WS_RESET_ORDERS, TWSActions } from '../action-types';
import type { TOrder } from '../../services/types-responses'

type TWSState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

export const initialWSState: TWSState = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const wsReducer = (state = initialWSState, action: TWSActions): TWSState => {
  switch (action.type) {
    case WS_GET_MESSAGE: {
      return {
        ...state,
        orders: action.orders,
        total: action.total,
        totalToday: action.totalToday
      }
    }
    case WS_RESET_ORDERS: {
      return initialWSState;
    }
    default: {
      return state;
    }
  }
};
