import { combineReducers } from 'redux';

import {
  burgerIngradientsReducer, burgerConstructorReducer, modalReducer, notifierReducer, orderDetailsReducer,
  profileReducer, wsReducer, wsAuthReducer
} from './';

export const rootReducer = combineReducers({
  ingredients: burgerIngradientsReducer,
  constructorContent: burgerConstructorReducer,
  modal: modalReducer,
  notifier: notifierReducer,
  orderDetails: orderDetailsReducer,
  profile: profileReducer,
  ws: wsReducer,
  wsAuth: wsAuthReducer
})
