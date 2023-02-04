import {
  ADD_BURGER_INGREDIENT,
  DELETE_BURGER_INGREDIENT,
  UPDATE_BURGER_BUN,
} from '../actions/burger-constructor';

const initialState = {
  // булка всегда нулевой элемент массива!
  // при инициализации нулевой элемент массива устанавливаем в blank
  burger: [{type: 'blank', key: 0, price: 0, count: 1}]
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BURGER_INGREDIENT: {
      return {
        ...state,
        burger: [...state.burger, action.ingredient]
      };
    }
    case DELETE_BURGER_INGREDIENT: {
      return {
        ...state,
        burger: [...state.burger].filter((item) => item.key !== action.key)
      };
    }
    case UPDATE_BURGER_BUN: {
      let newBurger = state.burger;
      // булка всегда нулевой элемент массива!
      // нулевой элемент массива или булка или blank (при инициализации)
      // заменяем нулевой элемент массива новой булкой (count = 2)
      newBurger.splice(0, 1, action.ingredient);
      return {
        ...state,
        burger: newBurger
      };
    }
    default: {
      return state;
    }
  };
}
