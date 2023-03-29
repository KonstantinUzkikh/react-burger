import { AppDispatch, AppThunk } from '../types-store';
import { apiFlagUp, apiFlagDown, apiError } from '../actions';
import { writeForgot } from '../../utils';
import { getForgotPassword } from '../../services/get-data';
import { TResponseForgotPassword } from '../../services/types-responses';
import type { TInputValues } from '../../hooks/useForm';

export const getForgotPasswordThunk = (email: TInputValues, goPath: () => void): AppThunk => (dispatch: AppDispatch) => {
  dispatch(apiFlagUp('profile'));
  getForgotPassword(email)
    .then((res: TResponseForgotPassword) => {
      dispatch(apiFlagDown(res.message));
      writeForgot();
      goPath();
    })
    .catch(err => dispatch(apiError(err)))
}
