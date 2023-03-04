export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const endPoints = {
  ingredients: '/ingredients',
  orders: '/orders',
  register: '/auth/register',
  login: '/auth/login',
  logout: '/auth/logout',
  read: '/auth/user',
  update: '/auth/user',
  forgot: '/password-reset',
  reset: '/password-reset/reset',
  token: '/auth/token'
}

export const loadingMessages = [
  {
    source: 'ingredients',
    loadingMsg: 'Загружаем доступные ингредиенты...',
  },
  {
    source: 'order',
    loadingMsg: 'Оформляем заказ...',
  },
  {
    source: 'profile',
    loadingMsg: 'Личный кабинет...',
  }
]
