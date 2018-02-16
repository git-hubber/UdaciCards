import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import Reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    Reducers,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
