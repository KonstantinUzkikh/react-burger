import { GET_ORDER_ID_SUCCESS, ORDER_ID_RESET,
  type IOrderIdSuccessAction, IOrderIdResetAction
} from '../action-types';

export const getOrderIdSuccess =
  (nameOrderedBurger: string, orderId: number, burger: string[]):IOrderIdSuccessAction => {
  return {
    type: GET_ORDER_ID_SUCCESS,
    nameOrderedBurger,
    orderId,
    burger
  }
};

export const resetOrderId = (): IOrderIdResetAction => { return {type: ORDER_ID_RESET} };
