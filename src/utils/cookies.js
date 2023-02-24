//Устанавливает куки с именем name и значением value, с настройкой path=/ по умолчанию
//(можно изменить, чтобы добавить другие значения по умолчанию):
export function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }
  document.cookie = updatedCookie;
}
// Пример использования:
//setCookie('user', 'John', {secure: true, 'max-age': 3600});


// возвращает куки с указанным name или undefined, если ничего не найдено
export function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function writeUserData(name, email) {
  setCookie('name', name);
  setCookie('email', email, { 'max-age': 1200 }); //УБРАТЬ ОГРАНИЧЕНИЕ ПО ВРЕМЕНИ ЖИЗНИ
}

export function readUserData() {
  return { name: getCookie('name'), email: getCookie('email') };
}

export const writePassword = (password) => setCookie('password', password);
export const readPassword = () => getCookie('password');

export function writeTokens(accessToken, refreshToken) {
  setCookie('accessToken', accessToken.slice('Bearer '.length), { 'max-age': 10 });
  setCookie('refreshToken', refreshToken);
}

export function readTokens() {
  let accessToken = getCookie('accessToken');
  if (accessToken !== undefined) {accessToken = 'Bearer ' + accessToken};
  return { accessToken: accessToken, refreshToken: getCookie('refreshToken') };
}

export const writeForgot = () => setCookie('forgot', 'Ok');
export const readForgot = () => getCookie('forgot');
export const deleteForgot = () => setCookie('forgot', '', { 'max-age': 0 });

export function writeAccessToken(accessToken) {
  setCookie('accessToken', accessToken.slice('Bearer '.length), { 'max-age': 10 });
}

export function deleteCookies() {
  setCookie('name', '', { 'max-age': 0 });
  setCookie('email', '', { 'max-age': 0 });
  setCookie('password', '', { 'max-age': 0 });
  setCookie('accessToken', '', { 'max-age': 0 });
  setCookie('refreshToken', '', { 'max-age': 0 });
  setCookie('forgot', '', { 'max-age': 0 });
}
