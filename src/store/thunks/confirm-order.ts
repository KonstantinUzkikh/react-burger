import { AppDispatch, AppThunk } from '../types-store';
import { sendRequest, getSuccess, getFaild, getOrderIdSuccess } from '../actions';
import { getConfirmOrder } from '../../services/get-data';
import { TResponseOrder } from '../../services/types-responses';

export const getConfirmOrderThunk = (burger: string[], goPath: () => void): AppThunk => (dispatch: AppDispatch) => {
  dispatch(sendRequest('orderID'));
  getConfirmOrder(burger, goPath)
    .then((res: TResponseOrder) => {
      dispatch(getSuccess())
      dispatch(getOrderIdSuccess(res.name, res.order.number, burger))
    })
    .catch(err => {
      dispatch(getFaild(err))
    })
}
