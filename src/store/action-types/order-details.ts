export const GET_ORDER_ID_SUCCESS: 'GET_ORDER_ID_SUCCESS' = 'GET_ORDER_ID_SUCCESS';
export const ORDER_ID_RESET: 'ORDER_ID_RESET' = 'ORDER_ID_RESET';

export interface IOrderIdSuccessAction {
  readonly type: typeof GET_ORDER_ID_SUCCESS;
  readonly nameBurger: string;
  readonly orderId: number;
}

export interface IOrderIdResetAction {
  readonly type: typeof ORDER_ID_RESET;
}

export type TOrderIdActions = IOrderIdSuccessAction | IOrderIdResetAction;
