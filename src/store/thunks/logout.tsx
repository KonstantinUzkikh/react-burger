import { AppDispatch, AppThunk } from '../types-store';
import { sendRequest, getSuccess, getFaild, profileReset } from '../actions';
import { readTokens, deleteCookies } from '../../utils/cookies';
import { getLogout } from '../../services/get-data';
import { TResponseLogout } from '../../services/types-request';

export const getLogoutThunk = (goPath: () => void): AppThunk => (dispatch: AppDispatch) => {
  const { refreshToken } = readTokens();
    dispatch(sendRequest('profile'));
    getLogout(refreshToken)
      .then((res: TResponseLogout) => {
        deleteCookies();
        dispatch(getSuccess(res.message));
        dispatch(profileReset());
        goPath();
      })
      .catch(err => dispatch(getFaild(err)))
}

