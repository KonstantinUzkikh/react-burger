import type { TIngredient } from '../../utils/types-data';
import { GET_INGREDIENTS_SUCCESS, INCREASE_COUNT_BURGER_INGREDIENT, DECREASE_COUNT_BURGER_INGREDIENT,
  CANCEL_COUNT_ALL_INGREDIENTS, CANCEL_COUNT_BURGER_BUN, SET_DOUBLE_COUNT_BURGER_BUN,
  IGetIngredientsSuccess, ICancelCountAllIngredients, IIncreaseCountIngredient, IDecreaseCountIngredient,
  ISetCountBun, ICancelCountBun
} from '../action-types';

export const getIngredientsSuccess = (ingredients: TIngredient[]): IGetIngredientsSuccess => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: ingredients.map((item) => {
      item.count = 0;
      return (item);
    })
  }
};

export const cancelCountAllIngredients = ():ICancelCountAllIngredients => { return {type: CANCEL_COUNT_ALL_INGREDIENTS} };

export const increaseCountIngredient = (id: string): IIncreaseCountIngredient => {
  return {
    type: INCREASE_COUNT_BURGER_INGREDIENT,
    _id: id
  }
};

export const decreaseCountIngredient = (id: string): IDecreaseCountIngredient => {
  return {
    type: DECREASE_COUNT_BURGER_INGREDIENT,
    _id: id
  }
};

export const cancelCountBun = (id: string): ICancelCountBun => {
  return {
    type: CANCEL_COUNT_BURGER_BUN,
    _id: id
  }
};

export const setCountBun = (id: string): ISetCountBun => {
  return {
    type: SET_DOUBLE_COUNT_BURGER_BUN,
    _id: id
  }
};
