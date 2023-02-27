import { setType } from './common';

const setCount = (type, id) => {
  return {
    type: type,
    _id: id
  }
};

export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

export const CANCEL_COUNT_ALL_INGREDIENTS = 'CANCEL_COUNT_ALL_INGREDIENTS';
export const INCREASE_COUNT_BURGER_INGREDIENT = 'INCREASE_COUNT_BURGER_INGREDIENT';
export const DECREASE_COUNT_BURGER_INGREDIENT = 'DECREASE_COUNT_BURGER_INGREDIENT';
export const CANCEL_COUNT_BURGER_BUN = 'CANCEL_COUNT_BURGER_BUN';
export const SET_DOUBLE_COUNT_BURGER_BUN = 'SET_DOUBLE_COUNT_BURGER_BUN';

export const getIngredientsSuccess = (ingredients) => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: ingredients.map((item) => {
      item.count = 0;
      return (item);
    })
  }
};

export const cancelCountAllIngredients = () => setType(CANCEL_COUNT_ALL_INGREDIENTS);
export const increaseCountIngredient = (id) => setCount(INCREASE_COUNT_BURGER_INGREDIENT, id);
export const decreaseCountIngredient = (id) => setCount(DECREASE_COUNT_BURGER_INGREDIENT, id);
export const cancelCountBun = (id) => setCount(CANCEL_COUNT_BURGER_BUN, id);
export const setCountBun = (id) => setCount(SET_DOUBLE_COUNT_BURGER_BUN, id);
