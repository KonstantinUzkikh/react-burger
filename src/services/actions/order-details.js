import { setType } from './common';

export const GET_ORDER_ID_SUCCESS = 'GET_ORDER_ID_SUCCESS';
export const CLEAR_ORDER_ID = 'CLEAR_ORDER_ID';

export const getOrderIdSuccess = (nameOrderedBurger, orderId, burger) => {
  return {
    type: GET_ORDER_ID_SUCCESS,
    nameOrderedBurger: nameOrderedBurger,
    orderId: orderId,
    burger: burger
  }
};

export const clearOrderId = () => setType(CLEAR_ORDER_ID);
