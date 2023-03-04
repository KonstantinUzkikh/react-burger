import { setType } from './common';

export const ADD_BURGER_INGREDIENT = 'ADD_BURGER_INGREDIENT';
export const DELETE_BURGER_INGREDIENT = 'DELETE_BURGER_INGREDIENT';
export const UPDATE_BURGER_BUN = 'UPDATE_BURGER_BUN';
export const RESET_BURGER = 'RESET_BURGER';
export const MOVE_BURGER_INGREDIENT = 'MOVE_BURGER_INGREDIENT';

export const addBurgerIngredient = (ingredient) => {
  return {
    type: ADD_BURGER_INGREDIENT,
    ingredient: ingredient
  }
}

export const deleteBurgerIngredient = (key) => {
  return {
    type: DELETE_BURGER_INGREDIENT,
    key: key
  }
}

export const updateBurgerBun = (ingredient) => {
  return {
    type: UPDATE_BURGER_BUN,
    ingredient: ingredient
  }
}

export const cancelBurger = () => setType(RESET_BURGER);

export const moveBurgerIngredient = (dragIndex, hoverIndex) => {
  return {
    type: MOVE_BURGER_INGREDIENT,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex
  }
}
