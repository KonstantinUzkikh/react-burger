import type { TIngredient } from '../../utils/types-data';

export const ADD_BURGER_INGREDIENT: 'ADD_BURGER_INGREDIENT' = 'ADD_BURGER_INGREDIENT';
export const DELETE_BURGER_INGREDIENT: 'DELETE_BURGER_INGREDIENT' = 'DELETE_BURGER_INGREDIENT';
export const UPDATE_BURGER_BUN: 'UPDATE_BURGER_BUN' = 'UPDATE_BURGER_BUN';
export const RESET_BURGER = 'RESET_BURGER';
export const MOVE_BURGER_INGREDIENT: 'MOVE_BURGER_INGREDIENT' = 'MOVE_BURGER_INGREDIENT';

export interface IAddBurgerIngredient {
  readonly type: typeof ADD_BURGER_INGREDIENT;
  readonly ingredient: TIngredient;
}

export interface IDeleteBurgerIngredient {
  readonly type: typeof DELETE_BURGER_INGREDIENT;
  readonly key: string;
}

export interface IUpdateBurgerBun {
  readonly type: typeof UPDATE_BURGER_BUN;
  readonly ingredient: TIngredient;
}

export interface IResetBurger {
  type: typeof RESET_BURGER;
};

export interface IMoveBurgerIngredient {
  readonly type: typeof MOVE_BURGER_INGREDIENT;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export type TBurgerConstructorActions = IAddBurgerIngredient | IDeleteBurgerIngredient
  | IUpdateBurgerBun | IResetBurger | IMoveBurgerIngredient;
