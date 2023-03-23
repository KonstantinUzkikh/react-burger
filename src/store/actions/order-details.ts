import {
  GET_ORDER_ID_SUCCESS, ORDER_ID_RESET,
  type IOrderIdSuccessAction, IOrderIdResetAction
} from '../action-types';

export const getOrderIdSuccess =
  (nameBurger: string, orderId: number): IOrderIdSuccessAction => {
    return {
      type: GET_ORDER_ID_SUCCESS,
      nameBurger: nameBurger,
      orderId,
    }
  };

export const resetOrderId = (): IOrderIdResetAction => { return { type: ORDER_ID_RESET } };
