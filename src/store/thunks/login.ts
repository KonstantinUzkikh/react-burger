import { AppDispatch, AppThunk } from '../types-store';
import { sendRequest, getSuccess, getFaild, getProfileSuccess } from '../actions';
import { writeTokens, writePassword } from '../../utils/cookies';
import { getLogin } from '../../services/get-data';
import { TResponseAuth } from '../../services/types-request';
import type { TInputValues } from '../../hooks/useForm';

export const getLoginThunk = (userData: TInputValues, goPath: () => void): AppThunk => (dispatch: AppDispatch) => {
  dispatch(sendRequest('profile'));
  getLogin(userData)
    .then((res: TResponseAuth) => {
      writeTokens(res.accessToken, res.refreshToken);
      writePassword(userData.password);
      dispatch(getSuccess());
      dispatch(getProfileSuccess(res.user, userData.password));
      goPath();
    })
    .catch(err => dispatch(getFaild(err)))
}
