import { GET_ORDER_ID_SUCCESS, ORDER_ID_RESET, type TOrderIdActions } from '../action-types';
import type { TIngredient } from '../../utils/types-data';

export type TOrderDetailsState = {
  isOrder: boolean;
  nameOrderedBurger: string | null;
  orderId: number | null;
  burger: string[]
};

const initialState: TOrderDetailsState = {
  isOrder: false,
  nameOrderedBurger: null,
  orderId: null,
  burger: []
};

export const orderDetailsReducer = (state = initialState, action: TOrderIdActions): TOrderDetailsState => {
  switch (action.type) {
    case GET_ORDER_ID_SUCCESS: {
      return {
        ...state,
        isOrder: true,
        orderId: action.orderId,
        nameOrderedBurger: action.nameOrderedBurger,
        burger: action.burger
      };
    }
    case ORDER_ID_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
