import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,

  INCREASE_COUNT_BURGER_INGREDIENT,
  DECREASE_COUNT_BURGER_INGREDIENT,
  CANCEL_COUNT_BURGER_BUN,
  SET_DOUBLE_COUNT_BURGER_BUN

} from '../actions/burger-ingradients';

const initialState = {
  isLoadingIngredients: false,
  hasErrorIngredients: false,
  ingredients: [],
};

export const burgerIngradientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoadingIngredients: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isLoadingIngredients: false,
        hasErrorIngredients: false,
        ingredients: action.ingredients
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        isLoadingIngredients: false,
        hasErrorIngredients: true
      };
    }
    case INCREASE_COUNT_BURGER_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((item, index) =>
          item._id === action._id ? { ...item, count: ++item.count } : item )
      };
    }
    case DECREASE_COUNT_BURGER_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) =>
          item._id === action._id ? { ...item, count: --item.count } : item )
      }
    }
    case CANCEL_COUNT_BURGER_BUN: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) =>
          item._id === action._id ? { ...item, count: 0 } : item )
      };
    }
    case SET_DOUBLE_COUNT_BURGER_BUN: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) =>
          item._id === action._id ? { ...item, count: 2 } : item )
      };
    }
    default: {
      return state;
    }
  }
};
