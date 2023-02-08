import { setType } from './common';

export const UPDATE_CURRENT_INGREDIENT = 'UPDATE_CURRENT_INGREDIENT';
export const CANCEL_CURRENT_INGREDIENT = 'CANCEL_CURRENT_INGREDIENT';

export const updateCurrentIngredient = (data) => {
  return {
    type: UPDATE_CURRENT_INGREDIENT,
    currentIngredient: data
  }
}

export const cancelCurrentIngredient = () => setType(CANCEL_CURRENT_INGREDIENT);
