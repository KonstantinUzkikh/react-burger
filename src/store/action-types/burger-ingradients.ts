import type { TIngredient } from '../../utils';

export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const RESET_COUNT_ALL_INGREDIENTS: 'RESET_COUNT_ALL_INGREDIENTS' = 'RESET_COUNT_ALL_INGREDIENTS';
export const INCREASE_COUNT_INGREDIENT: 'INCREASE_COUNT_INGREDIENT' = 'INCREASE_COUNT_INGREDIENT';
export const DECREASE_COUNT_INGREDIENT: 'DECREASE_COUNT_INGREDIENT' = 'DECREASE_COUNT_INGREDIENT';
export const RESET_COUNT_BUN: 'RESET_COUNT_BUN' = 'RESET_COUNT_BUN';
export const SET_DOUBLE_COUNT_BUN: 'SET_DOUBLE_COUNT_BUN' = 'SET_DOUBLE_COUNT_BUN';

export interface IGetIngredientsSuccess {
  type: typeof GET_INGREDIENTS_SUCCESS,
  ingredients: TIngredient[];
};

export interface IResetCountAllIngredients {
  type: typeof RESET_COUNT_ALL_INGREDIENTS;
};

export interface IIncreaseCountIngredient {
  type: typeof INCREASE_COUNT_INGREDIENT;
  _id: string;
};

export interface IDecreaseCountIngredient {
  type: typeof DECREASE_COUNT_INGREDIENT;
  _id: string;
};

export interface IResetCountBun {
  type: typeof RESET_COUNT_BUN;
  _id: string;
};

export interface ISetDoubleCountBun {
  type: typeof SET_DOUBLE_COUNT_BUN;
  _id: string;
};

export type TBurgerIngredientsActions = IGetIngredientsSuccess | IResetCountAllIngredients | IIncreaseCountIngredient
  | IDecreaseCountIngredient | IResetCountBun | ISetDoubleCountBun;
