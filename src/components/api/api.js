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

function request(url, options) {
  return fetch(url, options).then(checkResponse).then(checkSuccess)
}

export {request}
