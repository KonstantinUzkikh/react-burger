import { AppDispatch, AppThunk } from '../types-store';
import { sendRequest, getSuccess, getFaild, getProfileSuccess } from '../actions';
import { writePassword } from '../../utils/cookies';
import { getUpdateProfile } from '../../services/get-data';
import { TResponseUser } from '../../services/types-request';
import type { TInputValues } from '../../hooks/useForm';

export const getUpdateProfileThunk = (userData: TInputValues, goPath: () => void): AppThunk => (dispatch: AppDispatch) => {
  dispatch(sendRequest('profile'));
  getUpdateProfile(userData, goPath)
    .then((res: TResponseUser) => {
      writePassword(userData.password);
      dispatch(getSuccess());
      dispatch(getProfileSuccess(res.user, userData.password));
    })
    .catch(err => dispatch(getFaild(err)))
}

