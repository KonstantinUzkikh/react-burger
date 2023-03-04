import { readRefreshToken } from './cookies';

export const checkLogin = (): boolean => readRefreshToken() === undefined ? false : true;
