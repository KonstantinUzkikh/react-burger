import { AppDispatch, AppThunk } from '../types-store';
import { sendRequest, getSuccess, getFaild, getIngredientsSuccess } from '../actions';
import { getIngredients } from '../../services/get-data';
import { TResponseIngredients } from '../../services/types-request';

export const getIngredientsThunk = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(sendRequest('ingredients'));
  getIngredients()
    .then((res: TResponseIngredients) => {
      dispatch(getSuccess());
      dispatch(getIngredientsSuccess(res.data));
    })
    .catch(err => dispatch(getFaild(err)))
}
