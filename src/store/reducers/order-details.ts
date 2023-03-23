import { GET_ORDER_ID_SUCCESS, ORDER_ID_RESET, type TOrderIdActions } from '../action-types';

export type TOrderDetailsState = {
  isOrder: boolean;
  nameBurger: string | null;
  orderId: number | null;
};

export const initialOrderDetailsState: TOrderDetailsState = {
  isOrder: false,
  nameBurger: null,
  orderId: null,
};

export const orderDetailsReducer = (state = initialOrderDetailsState, action: TOrderIdActions): TOrderDetailsState => {
  switch (action.type) {
    case GET_ORDER_ID_SUCCESS: {
      return {
        ...state,
        isOrder: true,
        nameBurger: action.nameBurger,
        orderId: action.orderId,
      };
    }
    case ORDER_ID_RESET: {
      return initialOrderDetailsState;
    }
    default: {
      return state;
    }
  }
};
