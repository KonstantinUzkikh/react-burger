import { combineReducers } from 'redux';

import {
  ingradientsReducer, burgerConstructorReducer, modalReducer, notifierReducer, orderDetailsReducer,
  profileReducer, wsReducer, wsAuthReducer
} from './';

export const rootReducer = combineReducers({
  ingredients: ingradientsReducer,
  constructorContent: burgerConstructorReducer,
  modal: modalReducer,
  notifier: notifierReducer,
  orderDetails: orderDetailsReducer,
  profile: profileReducer,
  ws: wsReducer,
  wsAuth: wsAuthReducer
})
