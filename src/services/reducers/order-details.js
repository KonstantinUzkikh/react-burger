import {
  GET_ORDER_ID_SUCCESS,
  CLEAR_ORDER_ID
} from '../actions/order-details';

const initialState = {
  isOrder: false,
  orderId: null,
  nameOrderedBurger: null,
  burger: []
};

export const orderDetailsReducer = (state = initialState, action) => {
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
    case CLEAR_ORDER_ID: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
