import { AppDispatch, AppThunk } from '../types-store';
import { apiFlagUp, apiFlagDown, apiError, getIngredientsSuccess } from '../actions';
import { getIngredients } from '../../services/get-data';
import { TResponseIngredients } from '../../services/types-responses';

export const getIngredientsThunk = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(apiFlagUp('ingredients'));
  getIngredients()
    .then((res: TResponseIngredients) => {
      dispatch(apiFlagDown());
      dispatch(getIngredientsSuccess(res.data));
    })
    .catch(err => dispatch(apiError(err)))
}
