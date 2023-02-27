import { setType } from './common';

export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const CANCEL_ORDER_DETAILS = 'CANCEL_ORDER_DETAILS';

export const getOrderSuccess = (nameOrderedBurger, orderId, burger) => {
  return {
    type: GET_ORDER_SUCCESS,
    nameOrderedBurger: nameOrderedBurger,
    orderId: orderId,
    burger: burger
  }
};

export const cancelOrderDetails = () => setType(CANCEL_ORDER_DETAILS);
