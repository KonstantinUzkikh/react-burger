// server request parameters
//const config = {}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function getIngredients(url) {
  return fetch(url).then(checkResponse)
}

export {getIngredients}
