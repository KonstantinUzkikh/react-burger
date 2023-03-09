import { initialIngredient } from '../../utils/constants'
import { UPDATE_CURRENT_INGREDIENT, RESET_CURRENT_INGREDIENT, type TCurrentIngredientActions } from '../action-types';

import type { TIngredient } from '../../utils/types-data';

export type TIngredientState = {
  currentIngredient: TIngredient;
};

const initialState: TIngredientState = {
  currentIngredient: initialIngredient
};

export const ingredientDetailsReducer = (state = initialState, action: TCurrentIngredientActions): TIngredientState => {
  switch (action.type) {
    case UPDATE_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.currentIngredient
      };
    }
    case RESET_CURRENT_INGREDIENT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
