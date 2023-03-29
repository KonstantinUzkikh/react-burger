import { WS_RESET_ORDERS, WS_GET_ORDERS, TWSActions } from '../action-types';
import type { TOrder } from '../../utils/types-data'

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
    case WS_GET_ORDERS: {
      return {
        ...state,
        orders: action.data.orders,
        total: action.data.total,
        totalToday: action.data.totalToday
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
