/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { BASE_URL } from '../../utils/constants';

function checkResponse(res: Response):Promise<any> {
  if (res.ok) return res.json();
  return Promise.reject(`Status: ${res.status}`);
}

function checkSuccess(res: any): Promise<any> {
  if (res.success) return res;
  return Promise.reject(`Success: ${res.success}`);
}

function request(url: string, methodValue?: string | undefined,
  bodyValue?: object | undefined, header?: object | undefined):Promise<any>
{
  const options:{ [optionKey: string]: string | object } =
  {
    headers: <{ [optionKey: string]: string }>{'Content-Type': 'application/json' }
  }
  if (methodValue !== undefined) options.method = `${methodValue}`;
  if (bodyValue !== undefined) options.body = JSON.stringify(bodyValue);
  if (header !== undefined) Object.assign(options.headers, header);
  return fetch(`${BASE_URL}${url}`, options).then(checkResponse).then(checkSuccess)
}

export {request}
