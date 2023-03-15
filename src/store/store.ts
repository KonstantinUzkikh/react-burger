import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import { WS_BASE_URL, wsEndPointAll } from '../utils/constants';
import { rootReducer } from './reducers/rootReducer';
import { wsMiddleware } from './middleware/wsMiddleware';
import { wsActions, wsAuthActions} from './constants-ws-actions';

const withAuth = true;
const withoutAuth = false

const composeEnhancers = composeWithDevTools({trace: true});

const enhancer = composeEnhancers(applyMiddleware(
  thunkMiddleware,
  wsMiddleware(WS_BASE_URL + wsEndPointAll, withoutAuth, wsActions),
  wsMiddleware(WS_BASE_URL, withAuth, wsAuthActions)
));

export const initStore = (initialState = {}) => createStore(rootReducer, initialState, enhancer);
