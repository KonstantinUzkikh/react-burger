import { setType } from './common';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CANCEL_ORDER_DETAILS = 'CANCEL_ORDER_DETAILS';

export const getOrderRequest = () => setType(GET_ORDER_REQUEST);

export const getOrderSuccess = (nameOrderedBurger, orderId, burger) => {
  return {
    type: GET_ORDER_SUCCESS,
    nameOrderedBurger: nameOrderedBurger,
    orderId: orderId,
    burger: burger
  }
};

export const getOrderFaild = (error) => {
  return {
    type: GET_ORDER_FAILED,
    errorOrder: error
  }
};

export const cancelOrderDetails = () => setType(CANCEL_ORDER_DETAILS);
