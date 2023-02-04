import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CANCEL_ORDER_DETAILS
} from '../actions/order-details';

const initialState = {
  isLoadingСonfirmation: false,
  hasErrorСonfirmation: false,
  orderId: null,
  nameOrderedBurger: null,
  burger: []
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        isLoadingСonfirmation: true
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        isLoadingСonfirmation: false,
        hasErrorСonfirmation: false,
        orderId: action.orderId,
        nameOrderedBurger: action.nameOrderedBurger,
        burger: action.burger
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        isLoadingСonfirmation: false,
        hasErrorСonfirmation: true
      };
    }
    case CANCEL_ORDER_DETAILS: {
      return {
        ...state,
        isLoadingСonfirmation: false,
        hasErrorСonfirmation: false,
        orderId: null,
        nameOrderedBurger: null,
        burger: []
      };
    }
    default: {
      return state;
    }
  }
};
