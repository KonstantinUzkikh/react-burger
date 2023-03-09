import type { TIngredient } from '../../utils/types-data';
import { ADD_BURGER_INGREDIENT, DELETE_BURGER_INGREDIENT, UPDATE_BURGER_BUN, RESET_BURGER, MOVE_BURGER_INGREDIENT,
  IAddBurgerIngredient, IDeleteBurgerIngredient, IUpdateBurgerBun, IResetBurger, IMoveBurgerIngredient } from '../action-types';

export const addBurgerIngredient = (ingredient: TIngredient): IAddBurgerIngredient => {
  return {
    type: ADD_BURGER_INGREDIENT,
    ingredient: ingredient
  }
}

export const deleteBurgerIngredient = (key: string): IDeleteBurgerIngredient => {
  return {
    type: DELETE_BURGER_INGREDIENT,
    key: key
  }
}

export const updateBurgerBun = (ingredient: TIngredient): IUpdateBurgerBun => {
  return {
    type: UPDATE_BURGER_BUN,
    ingredient: ingredient
  }
}

export const cancelBurger = ():IResetBurger => { return {type: RESET_BURGER} };

export const moveBurgerIngredient = (dragIndex: number, hoverIndex: number): IMoveBurgerIngredient => {
  return {
    type: MOVE_BURGER_INGREDIENT,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex
  }
}
