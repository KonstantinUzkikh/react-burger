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

export const WS_BASE_URL = 'wss://norma.nomoreparties.space/orders';
export const wsEndPointAll = '/all';

export const waitMessages = [
  {
    source: 'ingredients',
    loadingMsg: 'Загружаем доступные ингредиенты...',
  },
  {
    source: 'orderID',
    loadingMsg: 'Оформляем заказ...',
  },
  {
    source: 'profile',
    loadingMsg: 'Личный кабинет...',
  },
  {
    source: 'orders',
    loadingMsg: 'Загружаем информацию о заказах...',
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

export const initialOrder = {
  name: '',
  ingredients: [],
  _id: '',
  status: '',
  number: 0,
  createdAt: '',
  updatedAt: '',
  total: 0
}
