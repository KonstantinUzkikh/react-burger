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

export const initialIngredient = {
  carbohydrates: 0,
  calories: 0,
  fat: 0,
  image: '',
  image_large: '',
  image_mobile: '',
  name: '',
  price: 0,
  proteins: 0,
  type: 'blank',
  __v: 0,
  _id: '',
  count: 0,
  key: ''
};
