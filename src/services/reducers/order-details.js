import {
  GET_ORDER_SUCCESS,
  CANCEL_ORDER_DETAILS
} from '../actions/order-details';

const initialState = {
  isOrder: false,
  orderId: null,
  nameOrderedBurger: null,
  burger: []
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        isOrder: true,
        orderId: action.orderId,
        nameOrderedBurger: action.nameOrderedBurger,
        burger: action.burger
      };
    }
    case CANCEL_ORDER_DETAILS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
