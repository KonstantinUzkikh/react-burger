import type { TIngredient } from '../../utils/types-data';

export const GET_ORDER_ID_SUCCESS: 'GET_ORDER_ID_SUCCESS' = 'GET_ORDER_ID_SUCCESS';
export const ORDER_ID_RESET: 'ORDER_ID_RESET' = 'ORDER_ID_RESET';

export interface IOrderIdSuccessAction {
  readonly type: typeof GET_ORDER_ID_SUCCESS;
  readonly nameOrderedBurger: string;
  readonly orderId: number;
  readonly burger: Array<TIngredient>;
}

export interface IOrderIdResetAction {
  readonly type: typeof ORDER_ID_RESET;
}

export type TOrderIdActions = IOrderIdSuccessAction | IOrderIdResetAction;
