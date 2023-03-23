import { TIngredient } from '../../utils';
import {
  GET_INGREDIENTS_SUCCESS, INCREASE_COUNT_INGREDIENT, DECREASE_COUNT_INGREDIENT,
  RESET_COUNT_ALL_INGREDIENTS, RESET_COUNT_BUN, SET_DOUBLE_COUNT_BUN,
  TBurgerIngredientsActions
} from '../action-types';

export type TBurgerIngradientsState = {
  isLoadIngredients: boolean;
  ingredients: TIngredient[];
};

export const initialIngradientsState: TBurgerIngradientsState = {
  isLoadIngredients: false,
  ingredients: [],
};

export const ingradientsReducer =
  (state = initialIngradientsState, action: TBurgerIngredientsActions): TBurgerIngradientsState => {
    switch (action.type) {
      case GET_INGREDIENTS_SUCCESS: {
        return {
          ...state,
          isLoadIngredients: true,
          ingredients: action.ingredients,
        };
      }
      case INCREASE_COUNT_INGREDIENT: {
        return {
          ...state,
          ingredients: state.ingredients.map(item =>
            item._id === action._id ? { ...item, count: ++item.count } : item)
        };
      }
      case DECREASE_COUNT_INGREDIENT: {
        return {
          ...state,
          ingredients: state.ingredients.map(item =>
            item._id === action._id ? { ...item, count: --item.count } : item)
        };
      }
      case RESET_COUNT_BUN: {
        return {
          ...state,
          ingredients: state.ingredients.map(item => item._id === action._id ? { ...item, count: 0 } : item)
        };
      }
      case SET_DOUBLE_COUNT_BUN: {
        return {
          ...state,
          ingredients: state.ingredients.map(item => item._id === action._id ? { ...item, count: 2 } : item)
        };
      }
      case RESET_COUNT_ALL_INGREDIENTS: {
        return {
          ...state,
          ingredients: state.ingredients.map(item => ({ ...item, count: 0 }) )
        }
      }
      default: {
        return state;
      }
    }
  };
