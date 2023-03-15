import { AppDispatch, AppThunk } from '../types-store';
import { resetOrderId, resetBurger, resetCountAllIngredients } from '../actions';

export const resetOrderDetailsThunk = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(resetOrderId());
  dispatch(resetBurger());
  dispatch(resetCountAllIngredients());
}
