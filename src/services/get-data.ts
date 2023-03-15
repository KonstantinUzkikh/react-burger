import { BASE_URL, endPoints } from '../utils/constants';
import { request } from './api';
import { writeTokens, readTokens } from '../utils/cookies';
import type { TInputValues } from '../hooks/useForm';
import { TResponseTokens } from './types-responses';

export function createOptions(methodValue?: string | undefined,
  bodyValue?: object | undefined, header?: object | undefined) {
  const options: { [optionKey: string]: string | object } =
    { headers: { 'Content-Type': 'application/json' } as { [optionKey: string]: string }}
  if (methodValue !== undefined) options.method = `${methodValue}`;
  if (bodyValue !== undefined) options.body = JSON.stringify(bodyValue);
  if (header !== undefined) Object.assign(options.headers, header);
  return options;
}

export function getIngredients() {
  return request(`${BASE_URL}${endPoints.ingredients}`)
};

export function getResetPassword({ newPassword, code }: TInputValues) {
  return request(`${BASE_URL}${endPoints.reset}`, createOptions('POST', { password: newPassword, token: code }));
}

export function getForgotPassword(email: TInputValues) {
  return request(`${BASE_URL}${endPoints.forgot}`, createOptions('POST', email));
}

export function getLogout(refreshToken: string | undefined) {
  return request(`${BASE_URL}${endPoints.logout}`, createOptions('POST', { token: refreshToken }));
}

export function getLogin(userData: TInputValues) {
  return request(`${BASE_URL}${endPoints.login}`, createOptions('POST', userData));
}

export function getRegister(userData: TInputValues) {
  return request(`${BASE_URL}${endPoints.register}`, createOptions('POST', userData));
}

export function getAccessToken(goPath?: () => void ) {
  const { accessToken, refreshToken } = readTokens();
  if (refreshToken === undefined) {
    if (goPath !== undefined) {
      return goPath();
    } else {
      return console.log('Оибка авторизации');
    }
  }
  if (accessToken !== undefined) return Promise.resolve(accessToken);
  request(`${BASE_URL}${endPoints.token}`, createOptions('POST', { token: refreshToken }))
    .then((res: TResponseTokens) => {
      writeTokens(res.accessToken, res.refreshToken);
      return res;
    })
    .catch((err: string) => err)
}

async function requestWithAuth(url: string, options: { [optionKey: string]: string | object }, goPath: () => void) {
  const accessToken = await getAccessToken(goPath);
  let fullOptions = options;
  options.headers === undefined
    ? fullOptions.headers = { authorization: accessToken }
    : Object.assign(fullOptions.headers, { authorization: accessToken })
  return request(url, fullOptions);
}

export function getReadProfile(goPath: () => void) {
  return requestWithAuth(`${BASE_URL}${endPoints.read}`, createOptions('GET'), goPath);
}

export function getUpdateProfile(userData: TInputValues, goPath: () => void) {
  return requestWithAuth(`${BASE_URL}${endPoints.update}`, createOptions('PATCH', userData), goPath);
}

export function getConfirmOrder(burger: string[], goPath: () => void) {
  return requestWithAuth(`${BASE_URL}${endPoints.orders}`, createOptions('POST', { ingredients: burger }), goPath);
}
