const initialState = {
  items: [],
  loading: false,
  error: null,
  editing: false,
  deleting: false,
};

const product = (state: object = initialState, action: any) => {
  switch (action.type) {
    case 'products/load/pending':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'products/load/fulfilled':
      return {
        ...state,
        loading: false,
        error: null,
        items: action.payload,
      };
    case 'products/load/rejected':
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case 'product/add/pending':
      return {
        ...state,
        loading: true,
      };
    case 'product/add/fulfilled':
      return {
        ...state,
        loading: false,
        items: {
          ...state.items.push(...action.payload),
        },
      };
    case 'product/add/rejected':
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case 'product/delete/pending':
      return {
        ...state,
        deleting: true,
      };
    case 'product/delete/fulfilled':
      return {
        ...state,
        deleting: false,
        items: state.items.filter((item: any) => item.id !== action.payload),
      };
    case 'product/delete/rejected':
      return {
        ...state,
        deleting: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default product;

export const allProducts = () => {
  return async (dispatch: any) => {
    dispatch({ type: 'products/load/pending' });

    try {
      const response = await fetch(
        'http://localhost:5000/api/product/products'
      );
      const json = await response.json();

      dispatch({ type: 'products/load/fulfilled', payload: json });
    } catch (e: any) {
      dispatch({ type: 'products/load/rejected', error: e.toString() });
    }
  };
};

export const addProduct = (data: any) => {
  const token: any = JSON.parse(
    <string>localStorage.getItem('user-reducer')
  ).token;
  return async (dispatch: any) => {
    dispatch({ type: 'product/add/pending' });

    try {
      const response = await fetch('http://localhost:5000/api/product', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: data.name,
          price: data.price,
        }),
      });
      const json = await response.json();

      console.log(json);

      dispatch({ type: 'product/add/fulfilled', payload: json });
    } catch (e: any) {
      dispatch({ type: 'product/add/rejected', error: e.toString() });
    }
  };
};

export const deleteProduct = (id: number) => {
  const token: any = JSON.parse(
    <string>localStorage.getItem('user-reducer')
  ).token;
  return async (dispatch: any) => {
    dispatch({ type: 'product/delete/pending' });

    try {
      await fetch(`http://localhost:5000/api/product/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: 'product/delete/fulfilled', payload: id });
    } catch (e: any) {
      dispatch({ type: 'product/delete/rejected', error: e.toString() });
    }
  };
};
