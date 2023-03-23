import type { TIngredient } from '../../utils';
import {
  GET_INGREDIENTS_SUCCESS, INCREASE_COUNT_INGREDIENT, DECREASE_COUNT_INGREDIENT,
  RESET_COUNT_ALL_INGREDIENTS, RESET_COUNT_BUN, SET_DOUBLE_COUNT_BUN,
  IGetIngredientsSuccess, IResetCountAllIngredients, IIncreaseCountIngredient, IDecreaseCountIngredient,
  ISetDoubleCountBun, IResetCountBun
} from '../action-types';

export const getIngredientsSuccess = (ingredients: TIngredient[]): IGetIngredientsSuccess => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: ingredients.map(item => ({ ...item, count: 0 }))
  }
};

export const resetCountAllIngredients = (): IResetCountAllIngredients => { return { type: RESET_COUNT_ALL_INGREDIENTS } };

export const increaseCountIngredient = (id: string): IIncreaseCountIngredient => {
  return {
    type: INCREASE_COUNT_INGREDIENT,
    _id: id
  }
};

export const decreaseCountIngredient = (id: string): IDecreaseCountIngredient => {
  return {
    type: DECREASE_COUNT_INGREDIENT,
    _id: id
  }
};

export const resetCountBun = (id: string): IResetCountBun => {
  return {
    type: RESET_COUNT_BUN,
    _id: id
  }
};

export const setDoubleCountBun = (id: string): ISetDoubleCountBun => {
  return {
    type: SET_DOUBLE_COUNT_BUN,
    _id: id
  }
};
