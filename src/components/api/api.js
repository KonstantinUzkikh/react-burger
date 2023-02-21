import { BASE_URL } from '../../utils/constants';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Status: ${res.status}`);
}

function checkSuccess(res) {
  if (res.success) {
    return res;
  }
  return Promise.reject(`Success: ${res.success}`);
}

function request(url, methodValue, bodyValue, header) {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (methodValue !== undefined) {
    options.method = `${methodValue}`;
  }
  if (bodyValue !== undefined) {
    options.body = JSON.stringify(bodyValue);
  };
  if (header !== undefined) {
    Object.assign(options.headers, header);
  }
  //console.log(options);
  return fetch(`${BASE_URL}${url}`, options).then(checkResponse).then(checkSuccess)
}

export {request}
