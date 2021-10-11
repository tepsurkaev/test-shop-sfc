import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './features/user.reducer';
import productReducer from './features/product.reducer';

const userToStorage = localStorage.getItem('user-reducer');

const preloadedStore = {
  user: userToStorage ? JSON.parse(userToStorage) : undefined,
};

const reducers = combineReducers({
  user: userReducer,
  product: productReducer,
});

export const store = createStore(
  reducers,
  preloadedStore,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  const { user } = store.getState();

  localStorage.setItem('user-reducer', JSON.stringify(user));
});
