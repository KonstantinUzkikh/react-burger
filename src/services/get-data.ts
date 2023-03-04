import { request } from '../components/api/api';
import { endPoints } from '../utils/constants';
import {
  deleteCookies, writePassword, readPassword, writeTokens, readTokens, writeForgot, deleteForgot
} from '../utils/cookies';
import { sendRequest, getSuccess, getFaild } from './actions/api';
import { getIngredientsSuccess } from './actions/burger-ingradients';
import { getOrderIdSuccess } from './actions/order-details';
import { getProfileSuccess, resetProfile } from './actions/profile';
import { TUser, TIngredient } from '../utils/types';
import type { TInputValues } from '../hooks/useForm';

// api types

export type TMethod = 'GET' | 'PATCH' | 'POST';

export type TIngredientFromResponse = Omit<TIngredient, 'count' | 'key'>;

export type TResponseIngredients = {
  success: boolean;
  data: Array<TIngredientFromResponse>;
};

export type TResponseOrder = {
  success: boolean;
  name: string;
  order: {number:number};
}

export type TResponseTokens = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export type TResponseUser = {
  success: boolean;
  user: TUser;
}

export type TResponseAuth = {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string;
}

export type TResponseLogout = {
  success: boolean;
  message: string;
}

export type TResponseForgotPassword = {
  success: boolean;
  message: string;
}

export type TResponseResetPassword = {
  success: boolean;
  message: string;
}

export function getIngredients() {
  return function (dispatch: any) {
    dispatch(sendRequest('ingredients'));
    request(endPoints.ingredients)
      .then((res: TResponseIngredients) => {
        dispatch(getSuccess());
        dispatch(getIngredientsSuccess(res.data));
      })
      .catch(err => dispatch(getFaild(err)))
  };
}

export function getConfirmOrder(burger: TIngredient[]) {
  return function (dispatch: any) {
    dispatch(sendRequest('order'));
    request(endPoints.orders, 'POST', { ingredients: burger })
      .then((res: TResponseOrder) => {
        dispatch(getSuccess())
        dispatch(getOrderIdSuccess(res.name, res.order.number, burger))
      })
      .catch(err => {
        dispatch(getFaild(err))
      })
  };
}

async function requestWithAuth(endPoint: string, method: TMethod, body: TInputValues | undefined, goPath: () => void) {
  let { accessToken, refreshToken } = readTokens();
  if (refreshToken === undefined) return goPath();
  if (accessToken !== undefined) return request(endPoint, method, body, { authorization: accessToken });
  const res: TResponseTokens = await request(endPoints.token, 'POST', { token: refreshToken })
  try {
    writeTokens(res.accessToken, res.refreshToken);
    return request(endPoint, method, body, { authorization: res.accessToken })
  }
  catch (err) { return err }
}

export function getReadProfileNew(goPath: () => void) {
  return function (dispatch: any) {
    dispatch(sendRequest('profile'));
    requestWithAuth(endPoints.read, 'GET', undefined, goPath)
      .then((res: TResponseUser) => {
        dispatch(getSuccess());
        dispatch(getProfileSuccess(res.user, readPassword() || ''));
      })
      .catch(err => dispatch(getFaild(err)))
  };
}

export function getUpdateProfile(userData: TInputValues, goPath: () => void) {
  return function (dispatch: any) {
    dispatch(sendRequest('profile'));
    requestWithAuth(endPoints.update, 'PATCH', userData, goPath)
      .then((res: TResponseUser) => {
        writePassword(userData.password);
        dispatch(getSuccess());
        dispatch(getProfileSuccess(res.user, userData.password));
      })
      .catch(err => dispatch(getFaild(err)))
  };
}

export function getResetPassword({ newPassword, code }: TInputValues, goPath: () => void) {
  return function (dispatch: any) {
    dispatch(sendRequest('profile'));
    request(endPoints.reset, 'POST', {password: newPassword, token: code})
      .then((res: TResponseResetPassword) => {
        dispatch(getSuccess(res.message));
        deleteForgot();
        goPath();
      })
      .catch(err => dispatch(getFaild(err)))
  }
}

export function getForgotPassword(email: TInputValues, goPath: () => void) {
  return function (dispatch: any) {
    dispatch(sendRequest('profile'));
    request(endPoints.forgot, 'POST', email)
      .then((res: TResponseForgotPassword) => {
        dispatch(getSuccess(res.message));
        writeForgot();
        goPath();
      })
      .catch(err => dispatch(getFaild(err)))
  }
}

export function getLogout(goPath: () => void) {
  const { refreshToken } = readTokens();
  return function (dispatch: any) {
    dispatch(sendRequest('profile'));
    request(endPoints.logout, 'POST', { token: refreshToken })
      .then((res: TResponseLogout) => {
        deleteCookies();
        dispatch(getSuccess(res.message));
        dispatch(resetProfile());
        goPath();
      })
      .catch(err => dispatch(getFaild(err)))
  }
}

export function getLogin(userData: TInputValues, goPath: () => void) {
  return function (dispatch: any) {
    dispatch(sendRequest('profile'));
    request(endPoints.login, 'POST', userData)
      .then((res: TResponseAuth) => {
        writeTokens(res.accessToken, res.refreshToken);
        writePassword(userData.password);
        dispatch(getSuccess());
        dispatch(getProfileSuccess(res.user, userData.password));
        goPath();
      })
      .catch(err => dispatch(getFaild(err)))
  }
}

export function getRegister(userData: TInputValues, goPath: () => void) {
  return function (dispatch: any) {
    dispatch(sendRequest('profile'));
    request(endPoints.register, 'POST', userData)
      .then((res: TResponseAuth) => {
        writeTokens(res.accessToken, res.refreshToken);
        writePassword(userData.password);
        dispatch(getSuccess());
        dispatch(getProfileSuccess(res.user, userData.password));
        goPath();
      })
      .catch(err => dispatch(getFaild(err)))
  }
}
