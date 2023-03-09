import type { TIngredient } from '../../utils/types-data';

export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const CANCEL_COUNT_ALL_INGREDIENTS: 'CANCEL_COUNT_ALL_INGREDIENTS' = 'CANCEL_COUNT_ALL_INGREDIENTS';
export const INCREASE_COUNT_BURGER_INGREDIENT: 'INCREASE_COUNT_BURGER_INGREDIENT' = 'INCREASE_COUNT_BURGER_INGREDIENT';
export const DECREASE_COUNT_BURGER_INGREDIENT: 'DECREASE_COUNT_BURGER_INGREDIENT' = 'DECREASE_COUNT_BURGER_INGREDIENT';
export const CANCEL_COUNT_BURGER_BUN: 'CANCEL_COUNT_BURGER_BUN' = 'CANCEL_COUNT_BURGER_BUN';
export const SET_DOUBLE_COUNT_BURGER_BUN: 'SET_DOUBLE_COUNT_BURGER_BUN' = 'SET_DOUBLE_COUNT_BURGER_BUN';

export interface IGetIngredientsSuccess {
  type: typeof GET_INGREDIENTS_SUCCESS,
  ingredients: TIngredient[];
};

export interface ICancelCountAllIngredients {
  type: typeof CANCEL_COUNT_ALL_INGREDIENTS;
};

export interface IIncreaseCountIngredient {
  type: typeof INCREASE_COUNT_BURGER_INGREDIENT;
  _id: string;
};

export interface IDecreaseCountIngredient {
  type: typeof DECREASE_COUNT_BURGER_INGREDIENT;
  _id: string;
};

export interface ICancelCountBun {
  type: typeof CANCEL_COUNT_BURGER_BUN;
  _id: string;
};

export interface ISetCountBun {
  type: typeof SET_DOUBLE_COUNT_BURGER_BUN;
  _id: string;
};

export type TBurgerIngredientsActions = IGetIngredientsSuccess | ICancelCountAllIngredients | IIncreaseCountIngredient
  | IDecreaseCountIngredient | ICancelCountBun | ISetCountBun;
