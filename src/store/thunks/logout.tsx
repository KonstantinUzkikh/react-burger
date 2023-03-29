import { AppDispatch, AppThunk } from '../types-store';
import { apiFlagUp, apiFlagDown, apiError, profileReset } from '../actions';
import { readTokens, deleteCookies } from '../../utils';
import { getLogout } from '../../services/get-data';
import { TResponseLogout } from '../../services/types-responses';

export const getLogoutThunk = (goPath: () => void): AppThunk => (dispatch: AppDispatch) => {
  const { refreshToken } = readTokens();
    dispatch(apiFlagUp('profile'));
    getLogout(refreshToken)
      .then((res: TResponseLogout) => {
        deleteCookies();
        dispatch(apiFlagDown(res.message));
        dispatch(profileReset());
        goPath();
      })
      .catch(err => dispatch(apiError(err)))
}

