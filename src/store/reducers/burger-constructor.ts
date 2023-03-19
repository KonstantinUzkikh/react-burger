import { initialIngredient, TIngredient } from '../../utils'
import {
  ADD_BURGER_INGREDIENT, DELETE_BURGER_INGREDIENT, UPDATE_BURGER_BUN, RESET_BURGER,
  MOVE_BURGER_INGREDIENT, TBurgerConstructorActions
} from '../action-types';

export type TBurgerConstructorState = {
  burger: TIngredient[]
};

const initialState: TBurgerConstructorState = {
  // булка всегда! нулевой элемент массива
  // при инициализации нулевой элемент массива устанавливаем в blank
  burger: [initialIngredient]
};

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions): TBurgerConstructorState => {
  switch (action.type) {
    case ADD_BURGER_INGREDIENT: {
      return {
        burger: [...state.burger, action.ingredient]
      };
    }
    case DELETE_BURGER_INGREDIENT: {
      return {
        burger: state.burger.filter((item) => item.key !== action.key)
      };
    }
    case UPDATE_BURGER_BUN: {
      let copiedStateBurger = state.burger;
      // булка всегда! нулевой элемент массива
      // нулевой элемент массива или булка или blank (при инициализации)
      // заменяем нулевой элемент массива новой булкой (count = 2)
      copiedStateBurger.splice(0, 1, action.ingredient);
      return {
        burger: copiedStateBurger
      };
    }
    case RESET_BURGER: {
      return {
        burger: [initialIngredient]
      };
    }
    case MOVE_BURGER_INGREDIENT: {
      const copiedStateBurger = state.burger;
      const dragIngredient = copiedStateBurger[action.dragIndex];
      const hoverIngredient = copiedStateBurger[action.hoverIndex];
      copiedStateBurger.splice(action.hoverIndex, 1, dragIngredient);
      copiedStateBurger.splice(action.dragIndex, 1, hoverIngredient);
      return {
        burger: copiedStateBurger
      };
    }
    default: {
      return state;
    }
  };
}
