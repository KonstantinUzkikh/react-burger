function checkResponse(res: Response):Promise<any> {
  if (res.ok) return res.json();
  return Promise.reject(`Status: ${res.status}`);
}

function checkSuccess(res: any): Promise<any> {
  if (res.success) return res;
  return Promise.reject(`Success: ${res.success}`);
}

export function request(url: string, options?: object | undefined):Promise<any> {
  return fetch(url, options).then(checkResponse).then(checkSuccess)
}
