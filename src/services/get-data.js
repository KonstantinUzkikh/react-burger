import { request } from '../components/api/api';
import { endPoints } from '../utils/constants';
import {
  deleteCookies, writeUserData, writePassword, readPassword, writeTokens, readTokens, writeForgot, deleteForgot
} from '../utils/cookies';
import { getIngredientsRequest, getIngredientsSuccess, getIngredientsFaild } from './actions/burger-ingradients';
import { getOrderRequest, getOrderSuccess, getOrderFaild } from './actions/order-details';
import { getProfileRequest, getProfileSuccess, getProfileFaild } from './actions/profile';

export function getIngredients() {
  return function (dispatch) {
    dispatch(getIngredientsRequest());
    request(endPoints.ingredients)
      .then(res => dispatch(getIngredientsSuccess(res.data)))
      .catch(err => dispatch(getIngredientsFaild(err)))
  };
}

export function getConfirmOrder(burger) {
  return function (dispatch) {
    dispatch(getOrderRequest());
    request(endPoints.orders, 'POST', { ingredients: burger })
      .then(res => dispatch(getOrderSuccess(res.name, res.order.number, burger)))
      .catch(err => dispatch(getOrderFaild(err)))
  };
}

async function requestWithAuth(endPoint, method, body, goPath) {
  let { accessToken, refreshToken } = readTokens();
  if (refreshToken === undefined) return goPath();
  if (accessToken !== undefined) return request(endPoint, method, body, { authorization: accessToken });
  const res = await request(endPoints.token, 'POST', { token: refreshToken })
  try {
    writeTokens(res.accessToken, res.refreshToken);
    return request(endPoint, method, body, { authorization: res.accessToken })
  }
  catch (err) { return err }
}

export async function getReadProfile(userData, goPath) {
  const res = await requestWithAuth(endPoints.read, 'GET', userData, goPath);
  try {
    writeUserData(res.user.name, res.user.email);
    return { name: res.user.name, email: res.user.email, password: readPassword() }
  }
  catch (err) { return err }
}

export function getUpdateProfile(userData, goPath) {
  return function (dispatch) {
    dispatch(getProfileRequest());
    requestWithAuth(endPoints.update, 'PATCH', userData, goPath)
      .then(res => {
        writeUserData(res.user.name, res.user.email);
        writePassword(userData.password);
        dispatch(getProfileSuccess());
      })
      .catch(err => dispatch(getProfileFaild(err)))
  };
}

export function getData(dispatch, endPoint, method, body, header, handler, goPath) {
  dispatch(getProfileRequest());
  request(endPoint, method, body, header)
    .then(res => {
      dispatch(getProfileSuccess(res.message));
      handler?.(res, dispatch);
      goPath?.();
    })
    .catch(err => dispatch(getProfileFaild(err)))
};

export function getProfile(source, userData, goPath) {
  let endPoint;
  source === 'login' ? endPoint = endPoints.login : endPoint = endPoints.register;
  const handler = (res) => {
    writeUserData(res.user.name, res.user.email);
    writeTokens(res.accessToken, res.refreshToken);
    writePassword(userData.password);
  }
  return function(dispatch) {
    getData(dispatch, endPoint, 'POST', userData, undefined, handler, goPath);
  }
}

export function getLogout(goPath) {
  const { refreshToken } = readTokens();
  return function(dispatch) {
    getData(dispatch, endPoints.logout, 'POST', { token: refreshToken }, undefined, deleteCookies, goPath);
  }
}

export function getForgotPassword({ email }, goPath) {
  return function (dispatch) {
    getData(dispatch, endPoints.forgot, 'POST', { email: email }, undefined, writeForgot, goPath);
  }
}

export function getResetPassword({ newPassword, code }, goPath) {
  return function (dispatch) {
    getData(dispatch, endPoints.reset, 'POST', {password: newPassword, token: code}, undefined, deleteForgot, goPath);
  }
}
