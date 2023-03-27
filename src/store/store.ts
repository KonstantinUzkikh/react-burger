import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import { WS_BASE_URL } from '../utils';
import { rootReducer } from './reducers/rootReducer';
import { wsMiddleware } from './middleware/wsMiddleware';
import { wsDataMiddleware } from './middleware/wsDataMiddleware';
import { wsAllActions, wsAuthActions } from './constants-ws-actions';

const composeEnhancers = composeWithDevTools({ trace: true });

const enhancer = composeEnhancers(applyMiddleware(
  thunkMiddleware,
  wsMiddleware(WS_BASE_URL, wsAllActions),
  wsMiddleware(WS_BASE_URL, wsAuthActions),
  wsDataMiddleware()
));

export const initStore = (initialState = {}) => createStore(rootReducer, initialState, enhancer);
