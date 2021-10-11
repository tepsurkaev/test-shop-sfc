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
