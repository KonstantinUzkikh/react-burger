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

export const loadingMessages = [
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


export const orderTMP = {
  name: "Interstellar бургер",
  ingredients: [
    "60d3b41abdacab0026a733c6",
    "60d3b41abdacab0026a733d3",
    "60d3b41abdacab0026a733ce",
    "60d3b41abdacab0026a733d0",
    "60d3b41abdacab0026a733c9",
    "60d3b41abdacab0026a733d1",
    "60d3b41abdacab0026a733d0",
    "60d3b41abdacab0026a733ce",
    "60d3b41abdacab0026a733d3"
  ],
  _id: "034534",
  status: "done",
  number: 1,
  createdAt: "2021-06-23T14:43:22.587Z",
  updatedAt: "2021-06-23T14:43:22.603Z"
}
