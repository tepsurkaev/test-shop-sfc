import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import user from './features/user.reducer';
import product from './features/product.reducer';

const userToStorage = localStorage.getItem('user-reducer');
const productToStorage = localStorage.getItem('product-reducer');

const preloadedStore = {
  user: userToStorage ? JSON.parse(userToStorage) : undefined,
  product: productToStorage ? JSON.parse(productToStorage) : undefined,
};

export const store = createStore(
  combineReducers({ user, product }),
  preloadedStore,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  const { user, product } = store.getState();

  localStorage.setItem('user-reducer', JSON.stringify(user));
  localStorage.setItem('product-reducer', JSON.stringify(product));
});
