import { AppDispatch, AppThunk } from '../types-store';
import { apiFlagUp, apiFlagDown, apiError, getProfileSuccess } from '../actions';
import { readPassword } from '../../utils';
import { getReadProfile } from '../../services/get-data';
import { TResponseUser } from '../../services/types-responses';

export const getReadProfileThunk = (goPath: () => void): AppThunk => (dispatch: AppDispatch) => {
  dispatch(apiFlagUp('profile'));
  getReadProfile(goPath)
    .then((res: TResponseUser) => {
      dispatch(apiFlagDown());
      dispatch(getProfileSuccess(res.user, readPassword() || ''));
    })
    .catch(err => dispatch(apiError(err)))
}
