import { AppDispatch, AppThunk } from '../types-store';
import { sendRequest, getSuccess, getFaild } from '../actions';
import { deleteForgot } from '../../utils/cookies';
import { getResetPassword } from '../../services/get-data';
import { TResponseResetPassword } from '../../services/types-request';
import type { TInputValues } from '../../hooks/useForm';

export const getResetPasswordThunk = ({ newPassword, code }: TInputValues, goPath: () => void):
  AppThunk => (dispatch: AppDispatch) => {
    dispatch(sendRequest('profile'));
    getResetPassword({ newPassword, code })
      .then((res: TResponseResetPassword) => {
        dispatch(getSuccess(res.message));
        deleteForgot();
        goPath();
      })
      .catch(err => dispatch(getFaild(err)))
}
