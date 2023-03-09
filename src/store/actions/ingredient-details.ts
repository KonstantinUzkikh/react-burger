import type { TIngredient } from '../../utils/types-data';
import { UPDATE_CURRENT_INGREDIENT, RESET_CURRENT_INGREDIENT,
  IUpdateCurrentIngredient, IResetCurrentIngredient
} from '../action-types';

export const updateCurrentIngredient = (currentIngredient: TIngredient): IUpdateCurrentIngredient => {
  return {
    type: UPDATE_CURRENT_INGREDIENT,
    currentIngredient
  }
}

export const resetCurrentIngredient = (): IResetCurrentIngredient => { return {type: RESET_CURRENT_INGREDIENT} };
