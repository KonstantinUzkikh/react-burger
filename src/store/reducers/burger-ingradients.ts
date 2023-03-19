import { TIngredient } from '../../utils';
import {
  GET_INGREDIENTS_SUCCESS, INCREASE_COUNT_BURGER_INGREDIENT, DECREASE_COUNT_BURGER_INGREDIENT,
  CANCEL_COUNT_ALL_INGREDIENTS, CANCEL_COUNT_BURGER_BUN, SET_DOUBLE_COUNT_BURGER_BUN,
  TBurgerIngredientsActions
} from '../action-types';

export type TBurgerIngradientsState = {
  isLoadIngredients: boolean;
  ingredients: TIngredient[];
};

const initialState: TBurgerIngradientsState = {
  isLoadIngredients: false,
  ingredients: [],
};

export const burgerIngradientsReducer =
  (state = initialState, action: TBurgerIngredientsActions): TBurgerIngradientsState => {
    switch (action.type) {
      case GET_INGREDIENTS_SUCCESS: {
        return {
          ...state,
          isLoadIngredients: true,
          ingredients: action.ingredients,
        };
      }
      case INCREASE_COUNT_BURGER_INGREDIENT: {
        return {
          ...state,
          ingredients: state.ingredients.map(item => item._id === action._id ? { ...item, count: ++item.count } : item)
        };
      }
      case DECREASE_COUNT_BURGER_INGREDIENT: {
        return {
          ...state,
          ingredients: state.ingredients.map(item => item._id === action._id ? { ...item, count: --item.count } : item)
        }
      }
      case CANCEL_COUNT_BURGER_BUN: {
        return {
          ...state,
          ingredients: state.ingredients.map(item => item._id === action._id ? { ...item, count: 0 } : item)
        };
      }
      case SET_DOUBLE_COUNT_BURGER_BUN: {
        return {
          ...state,
          ingredients: state.ingredients.map(item => item._id === action._id ? { ...item, count: 2 } : item)
        };
      }
      case CANCEL_COUNT_ALL_INGREDIENTS: {
        return {
          ...state,
          ingredients: state.ingredients.map(item => { return { ...item, count: 0 } })
        }
      }
      default: {
        return state;
      }
    }
  };
