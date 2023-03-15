import { AppDispatch, AppThunk } from '../types-store';
import { sendRequest, getSuccess, getFaild, getProfileSuccess } from '../actions';
import { readPassword } from '../../utils/cookies';
import { getReadProfile } from '../../services/get-data';
import { TResponseUser } from '../../services/types-responses';

export const getReadProfileThunk = (goPath: () => void): AppThunk => (dispatch: AppDispatch) => {
  dispatch(sendRequest('profile'));
  getReadProfile(goPath)
    .then((res: TResponseUser) => {
      dispatch(getSuccess());
      dispatch(getProfileSuccess(res.user, readPassword() || ''));
    })
    .catch(err => dispatch(getFaild(err)))
}
