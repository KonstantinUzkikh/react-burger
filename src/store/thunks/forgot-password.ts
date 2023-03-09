import { AppDispatch, AppThunk } from '../types-store';
import { sendRequest, getSuccess, getFaild } from '../actions';
import { writeForgot } from '../../utils/cookies';
import { getForgotPassword } from '../../services/get-data';
import { TResponseForgotPassword } from '../../services/types-request';
import type { TInputValues } from '../../hooks/useForm';

export const getForgotPasswordThunk = (email: TInputValues, goPath: () => void): AppThunk => (dispatch: AppDispatch) => {
  dispatch(sendRequest('profile'));
  getForgotPassword(email)
    .then((res: TResponseForgotPassword) => {
      dispatch(getSuccess(res.message));
      writeForgot();
      goPath();
    })
    .catch(err => dispatch(getFaild(err)))
}
