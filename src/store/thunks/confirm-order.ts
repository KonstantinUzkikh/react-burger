import { AppDispatch, AppThunk } from '../types-store';
import { sendRequest, getSuccess, getFaild, getOrderIdSuccess } from '../actions';
import { getConfirmOrder } from '../../services/get-data';
import { TIngredient } from '../../utils/types-data';
import { TResponseOrder } from '../../services/types-request';

export const getConfirmOrderThunk = (burger: TIngredient[]): AppThunk => (dispatch: AppDispatch) => {
  dispatch(sendRequest('order'));
  getConfirmOrder(burger)
    .then((res: TResponseOrder) => {
      dispatch(getSuccess())
      dispatch(getOrderIdSuccess(res.name, res.order.number, burger))
    })
    .catch(err => {
      dispatch(getFaild(err))
    })
}
