import { AppDispatch, AppThunk } from '../types-store';
import { apiFlagUp, apiFlagDown, apiError, getProfileSuccess } from '../actions';
import { writePassword } from '../../utils';
import { getUpdateProfile } from '../../services/get-data';
import { TResponseUser } from '../../services/types-responses';
import type { TInputValues } from '../../hooks/useForm';

export const getUpdateProfileThunk = (userData: TInputValues, goPath: () => void): AppThunk => (dispatch: AppDispatch) => {
  dispatch(apiFlagUp('profile'));
  getUpdateProfile(userData, goPath)
    .then((res: TResponseUser) => {
      writePassword(userData.password);
      dispatch(apiFlagDown());
      dispatch(getProfileSuccess(res.user, userData.password));
    })
    .catch(err => dispatch(apiError(err)))
}

