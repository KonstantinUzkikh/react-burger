import { setType } from './common';

const setCount = (type, id) => {
  return {
    type: type,
    _id: id
  }
};

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const CANCEL_COUNT_ALL_INGREDIENTS = 'CANCEL_COUNT_ALL_INGREDIENTS';
export const INCREASE_COUNT_BURGER_INGREDIENT = 'INCREASE_COUNT_BURGER_INGREDIENT';
export const DECREASE_COUNT_BURGER_INGREDIENT = 'DECREASE_COUNT_BURGER_INGREDIENT';
export const CANCEL_COUNT_BURGER_BUN = 'CANCEL_COUNT_BURGER_BUN';
export const SET_DOUBLE_COUNT_BURGER_BUN = 'SET_DOUBLE_COUNT_BURGER_BUN';

export const getIngredientsRequest = () => setType(GET_INGREDIENTS_REQUEST);

export const getIngredientsSuccess = (ingredients) => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: ingredients.data.map((item) => {
      item.count = 0;
      return (item);
    })
  }
};

export const getIngredientsFaild = (error) => {
  return {
    type: GET_INGREDIENTS_FAILED,
    errorIngredients: error
  }
};

export const cancelCountAllIngredients = () => setType(CANCEL_COUNT_ALL_INGREDIENTS);

export const increaseCountIngredient = (id) => setCount(INCREASE_COUNT_BURGER_INGREDIENT, id);
export const decreaseCountIngredient = (id) => setCount(DECREASE_COUNT_BURGER_INGREDIENT, id);
export const cancelCountBun = (id) => setCount(CANCEL_COUNT_BURGER_BUN, id);
export const setCountBun = (id) => setCount(SET_DOUBLE_COUNT_BURGER_BUN, id);
