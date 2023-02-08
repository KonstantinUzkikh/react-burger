import {
  UPDATE_CURRENT_INGREDIENT,
  CANCEL_CURRENT_INGREDIENT
} from '../actions/ingredient-details';

const initialState = {
  currentIngredient: {}
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.currentIngredient
      };
    }
    case CANCEL_CURRENT_INGREDIENT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
