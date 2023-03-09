import type { TIngredient } from '../../utils/types-data';

export const UPDATE_CURRENT_INGREDIENT: 'UPDATE_CURRENT_INGREDIENT' = 'UPDATE_CURRENT_INGREDIENT';
export const RESET_CURRENT_INGREDIENT: 'RESET_CURRENT_INGREDIENT' = 'RESET_CURRENT_INGREDIENT';

export interface IUpdateCurrentIngredient {
  readonly type: typeof UPDATE_CURRENT_INGREDIENT;
  readonly currentIngredient: TIngredient;
}

export interface IResetCurrentIngredient {
  readonly type: typeof RESET_CURRENT_INGREDIENT;
}
export type TCurrentIngredientActions = IUpdateCurrentIngredient | IResetCurrentIngredient;
