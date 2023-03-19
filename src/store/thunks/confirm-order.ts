import { AppDispatch, AppThunk } from '../types-store';
import { apiFlagUp, apiFlagDown, apiError, getOrderIdSuccess } from '../actions';
import { getConfirmOrder } from '../../services/get-data';
import { TResponseOrder } from '../../services/types-responses';

export const getConfirmOrderThunk = (burger: string[], goPath: () => void): AppThunk => (dispatch: AppDispatch) => {
  dispatch(apiFlagUp('orderID'));
  getConfirmOrder(burger, goPath)
    .then((res: TResponseOrder) => {
      dispatch(apiFlagDown())
      dispatch(getOrderIdSuccess(res.name, res.order.number, burger))
    })
    .catch(err => {
      dispatch(apiError(err))
    })
}
