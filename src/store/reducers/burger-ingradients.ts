import { TIngredient } from '../../utils/types-data';
import {
  GET_INGREDIENTS_SUCCESS, INCREASE_COUNT_BURGER_INGREDIENT, DECREASE_COUNT_BURGER_INGREDIENT,
  CANCEL_COUNT_ALL_INGREDIENTS, CANCEL_COUNT_BURGER_BUN, SET_DOUBLE_COUNT_BURGER_BUN, TBurgerIngredientsActions
} from '../action-types';

export type TBurgerIngradientsState = {
  isLoadIngredients: boolean;
  ingredients: TIngredient[];
  arrID: string[];
};

const initialState: TBurgerIngradientsState = {
  isLoadIngredients: false,
  ingredients: [],
  arrID: []
};

export const burgerIngradientsReducer =
  (state = initialState, action: TBurgerIngredientsActions): TBurgerIngradientsState => {
    switch (action.type) {
      case GET_INGREDIENTS_SUCCESS: {
        const arrID = action.ingredients.map(item => item._id);
        return {
          ...state,
          isLoadIngredients: true,
          ingredients: action.ingredients,
          arrID: arrID
        };
      }
      case INCREASE_COUNT_BURGER_INGREDIENT: {
        return {
          ...state,
          ingredients: state.ingredients.map((item, index) =>
            item._id === action._id ? { ...item, count: ++item.count } : item)
        };
      }
      case DECREASE_COUNT_BURGER_INGREDIENT: {
        return {
          ...state,
          ingredients: state.ingredients.map((item) =>
            item._id === action._id ? { ...item, count: --item.count } : item)
        }
      }
      case CANCEL_COUNT_BURGER_BUN: {
        return {
          ...state,
          ingredients: state.ingredients.map((item) => item._id === action._id ? { ...item, count: 0 } : item)
        };
      }
      case SET_DOUBLE_COUNT_BURGER_BUN: {
        return {
          ...state,
          ingredients: state.ingredients.map((item) => item._id === action._id ? { ...item, count: 2 } : item)
        };
      }
      case CANCEL_COUNT_ALL_INGREDIENTS: {
        return {
          ...state,
          ingredients: state.ingredients.map((item) => { return { ...item, count: 0 } })
        }
      }
      default: {
        return state;
      }
    }
  };
