import { request } from '../components/api/api';
import { endPoints } from '../utils/constants';
import {
  deleteCookies, writeUserData, writePassword, readPassword, writeTokens, readTokens, writeForgot, deleteForgot
} from '../utils/cookies';
import { getIngredientsRequest, getIngredientsSuccess, getIngredientsFaild } from './actions/burger-ingradients';
import { getOrderRequest, getOrderSuccess, getOrderFaild } from './actions/order-details';
import { getProfileRequest, getProfileSuccess, getProfileFaild } from './actions/profile';
import { setInputs } from './actions/form';

export function getIngredients() {
  return function (dispatch) {
    dispatch(getIngredientsRequest());
    request(endPoints.ingredients)
      .then(res => dispatch(getIngredientsSuccess(res.data)))
      .catch(err => dispatch(getIngredientsFaild(err)))
  };
}

export async function getIngredient(id) {
  const res = await request(endPoints.ingredients)
  try {
    return res.data.find(item => item._id === id);
  }
  catch (err) { return err }
};

export function getConfirmOrder(burger) {
  return function (dispatch) {
    dispatch(getOrderRequest());
    request(endPoints.orders, 'POST', { ingredients: burger })
      .then(res => dispatch(getOrderSuccess(res.name, res.order.number, burger)))
      .catch(err => dispatch(getOrderFaild(err)))
  };
}

export function getProfile(source, userData, setPath) {
  let endPoint;
  source === 'login' ? endPoint = endPoints.login : endPoint = endPoints.register;
  return function (dispatch) {
    dispatch(getProfileRequest());
    request(endPoint, 'POST', userData)
      .then(res => {
        writeUserData(res.user.name, res.user.email);
        writeTokens(res.accessToken, res.refreshToken);
        writePassword(userData.password);
        dispatch(setInputs(res.user.name, res.user.email, userData.password));
        dispatch(getProfileSuccess());
        setPath !== undefined && setPath();
      })
      .catch(err => dispatch(getProfileFaild(err)))
  };
}

async function requestWithAuth(endPoint, method, body, setPath) {
  let { accessToken, refreshToken } = readTokens();
  if (refreshToken === undefined) return setPath();
  if (accessToken !== undefined) return request(endPoint, method, body, { authorization: accessToken });
  const res = await request(endPoints.token, 'POST', { token: refreshToken })
  try {
    writeTokens(res.accessToken, res.refreshToken);
    return request(endPoint, method, body, { authorization: res.accessToken })
  }
  catch (err) { return err }
}

export async function getReadProfile(userData, setPath) {
  const res = await requestWithAuth(endPoints.read, 'GET', userData, setPath);
  try {
    writeUserData(res.user.name, res.user.email);
    return { name: res.user.name, email: res.user.email, password: readPassword() }
  }
  catch (err) { return err }
}

export function getUpdateProfile(userData, setPath) {
  return function (dispatch) {
    dispatch(getProfileRequest());
    requestWithAuth(endPoints.update, 'PATCH', userData, setPath)
      .then(res => {
        writeUserData(res.user.name, res.user.email);
        writePassword(userData.password);
        dispatch(setInputs(res.user.name, res.user.email, userData.password));
        dispatch(getProfileSuccess());
      })
      .catch(err => dispatch(getProfileFaild(err)))
  };
}

export function getLogout(setPath) {
  const { refreshToken } = readTokens();
  return function (dispatch) {
    dispatch(getProfileRequest());
    request(endPoints.logout, 'POST', { token: refreshToken })
      .then(res => {
        dispatch(getProfileSuccess(res.message));
        deleteCookies();
        setPath !== undefined && setPath();
      })
      .catch(err => dispatch(getProfileFaild(err)))
  };
}

export function getForgotPassword(email, setPath) {
  return function (dispatch) {
    dispatch(getProfileRequest());
    request(endPoints.forgot, 'POST', { email: email })
      .then(res => {
        dispatch(getProfileSuccess(res.message));
        writeForgot();
        setPath !== undefined && setPath();
      })
      .catch(err => dispatch(getProfileFaild(err)))
  };
}

export function getResetPassword(newPassword, code, setPath) {
  return function (dispatch) {
    dispatch(getProfileRequest());
    request(endPoints.reset, 'POST', { password: newPassword, token: code })
      .then(res => {
        dispatch(getProfileSuccess(res.message));
        deleteForgot();
        setPath !== undefined && setPath();
      })
      .catch(err => dispatch(getProfileFaild(err)))
  };
}
