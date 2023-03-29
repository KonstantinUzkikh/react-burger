import { AppDispatch, AppThunk } from '../types-store';
import { apiFlagUp, apiFlagDown, apiError } from '../actions';
import { deleteForgot } from '../../utils';
import { getResetPassword } from '../../services/get-data';
import { TResponseResetPassword } from '../../services/types-responses';
import type { TInputValues } from '../../hooks/useForm';

export const getResetPasswordThunk = ({ newPassword, code }: TInputValues, goPath: () => void):
  AppThunk => (dispatch: AppDispatch) => {
    dispatch(apiFlagUp('profile'));
    getResetPassword({ newPassword, code })
      .then((res: TResponseResetPassword) => {
        dispatch(apiFlagDown(res.message));
        deleteForgot();
        goPath();
      })
      .catch(err => dispatch(apiError(err)))
}
