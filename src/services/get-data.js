import { request } from '../components/api/api';
import {
  deleteCookies, writeUserData, writePassword, readPassword, writeTokens, readTokens, writeForgot, deleteForgot
} from '../utils/cookies';
import { getIngredientsRequest, getIngredientsSuccess, getIngredientsFaild } from './actions/burger-ingradients';
import { getOrderRequest, getOrderSuccess, getOrderFaild } from './actions/order-details';
import { getProfileRequest, getProfileSuccess, getProfileFaild } from './actions/profile';

import { setInputs } from './actions/form';

export function loadIngredients() {
  request('/ingredients')
    .then(res => {
      console.log(res.data);
      return res.data})
    .catch(err => err)
};

export function getIngredients() {
  return function (dispatch) {
    dispatch(getIngredientsRequest());
    request('/ingredients')
      .then(res => dispatch(getIngredientsSuccess(res)))
      .catch(err => dispatch(getIngredientsFaild(err)))
  };
}

export function getConfirmOrder(burger) {
  return function (dispatch) {
    dispatch(getOrderRequest());
    request('/orders', 'POST', { ingredients: burger })
      .then(res => dispatch(getOrderSuccess(res.name, res.order.number, burger)))
      .catch(err => dispatch(getOrderFaild(err)))
  };
}

async function getAccessToken(refreshToken) { //ДОРАБОТАТЬ  - НЕ РАБОТАЕТ
  request('/auth/token', 'POST', { token: refreshToken })
    .then((res) => {
      console.log(res);
      writeTokens(res.accessToken, res.refreshToken);
      return res.accessToken;
    })
    .catch(err => {
      console.log(err);
      return err;
    })
}

function requestWithAuth(endPoint, method, body) { //ДОРАБОТАТЬ  - НЕ РАБОТАЕТ
  let header;
  let { accessToken, refreshToken } = readTokens();
  if (refreshToken === undefined) return console.log('Нужен повторный login'); //ДОРАБОТАТЬ ПЕРЕХОД
  if (accessToken === undefined) {
    request('/auth/token', 'POST', { token: refreshToken })
      .then(res => {
        console.log(res);
        writeTokens(res.accessToken, res.refreshToken);
        return header = { authorization: res.accessToken }
      })
      .then((header) => {
        request(endPoint, method, body, header)
      })
      .catch(err => err)
  } else {
    header = { authorization: accessToken }
    return request(endPoint, method, body, header)
  }
}

export function getRegisterProfile(userData, setPath) {
  return function (dispatch) {
    dispatch(getProfileRequest());
    request('/auth/register', 'POST', userData)
      .then(res => {
        writeUserData(res.user.name, res.user.email);
        writeTokens(res.accessToken, res.refreshToken);
        writePassword(userData.password);
        dispatch(getProfileSuccess());
        dispatch(setInputs(res.user.name, res.user.email, userData.password));
      })
      .then(() => setPath !== undefined && setPath())
      .catch(err => dispatch(getProfileFaild(err)))
  };
}

export function getLoginProfile(userData, setPath) {
  return function (dispatch) {
    dispatch(getProfileRequest());
    request('/auth/login', 'POST', userData)
      .then(res => {
        writeUserData(res.user.name, res.user.email);
        writeTokens(res.accessToken, res.refreshToken)
        writePassword(userData.password);
        dispatch(getProfileSuccess());
        dispatch(setInputs(res.user.name, res.user.email, userData.password));
      })
      .then(() => setPath !== undefined && setPath())
      .catch(err => dispatch(getProfileFaild(err)))
  };
}

export function getReadProfile(setPath) {
  return function (dispatch) {
    dispatch(getProfileRequest());
    requestWithAuth('/auth/user', 'GET')
      .then(res => {
        writeUserData(res.user.name, res.user.email);
        dispatch(getProfileSuccess());
        dispatch(setInputs(res.user.name, res.user.email, readPassword()));
      })
      .then(() => setPath !== undefined && setPath())
      .catch(err => dispatch(getProfileFaild(err)))
  };
}

export function getUpdateProfile(userData, setPath) {
  return function (dispatch) {
    dispatch(getProfileRequest());
    requestWithAuth('/auth/user', 'PATCH', userData)
      .then(res => {
        writeUserData(res.user.name, res.user.email);
        writePassword(userData.password);
        dispatch(getProfileSuccess());
        dispatch(setInputs(res.user.name, res.user.email, userData.password));
      })
      .then(() => setPath !== undefined && setPath())
      .catch(err => dispatch(getProfileFaild(err)))
  };
}

export function getLogout(setPath) {
  const { refreshToken } = readTokens();
  return function (dispatch) {
    dispatch(getProfileRequest());
    request('/auth/logout', 'POST', { token: refreshToken })
      .then(res => dispatch(getProfileSuccess(res.message)))
      .then(() => deleteCookies())
      .then(() => setPath !== undefined && setPath())
      .catch(err => dispatch(getProfileFaild(err)))
  };
}

export function getForgotPassword(email, setPath) {
  return function (dispatch) {
    dispatch(getProfileRequest());
    request('/password-reset', 'POST', { email: email })
      .then(res => dispatch(getProfileSuccess(res.message)))
      .then(() => writeForgot())
      .then(() => setPath !== undefined && setPath())
      .catch(err => dispatch(getProfileFaild(err)))
  };
}

export function getResetPassword(newPassword, code, setPath) {
  return function (dispatch) {
    dispatch(getProfileRequest());
    request('/password-reset/reset', 'POST', { password: newPassword, token: code })
      .then(res => dispatch(getProfileSuccess(res.message)))
      .then(() => deleteForgot())
      .then(() => setPath !== undefined && setPath())
      .catch(err => dispatch(getProfileFaild(err)))
  };
}
