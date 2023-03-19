import { AppDispatch, AppThunk } from '../types-store';
import { apiFlagUp, apiFlagDown, apiError, getProfileSuccess } from '../actions';
import { writeTokens, writePassword } from '../../utils';
import { getLogin } from '../../services/get-data';
import { TResponseAuth } from '../../services/types-responses';
import type { TInputValues } from '../../hooks/useForm';

export const getLoginThunk = (userData: TInputValues, goPath: () => void): AppThunk => (dispatch: AppDispatch) => {
  dispatch(apiFlagUp('profile'));
  getLogin(userData)
    .then((res: TResponseAuth) => {
      writeTokens(res.accessToken, res.refreshToken);
      writePassword(userData.password);
      dispatch(apiFlagDown());
      dispatch(getProfileSuccess(res.user, userData.password));
      goPath();
    })
    .catch(err => dispatch(apiError(err)))
}
