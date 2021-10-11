const initialState = {
  signingUp: false,
  signingIp: false,
  loading: false,
  error: null,
  role: null,
  token: null,
  isRegistered: false,
};

const user = (state: object = initialState, action: any) => {
  switch (action.type) {
    case 'user/registration/pending':
      return {
        ...state,
        signingUp: true,
        error: null,
        isRegistered: false,
      };
    case 'user/registration/fulfilled':
      return {
        ...state,
        signingUp: false,
        error: null,
        isRegistered: true,
      };
    case 'user/registration/rejected':
      return {
        ...state,
        signingUp: false,
        error: action.error,
      };

    case 'user/login/pending':
      return {
        ...state,
        signingIp: true,
        error: null,
      };
    case 'user/login/fulfilled':
      return {
        ...state,
        signingIp: false,
        error: null,
        token: action.payload.token,
        role: action.payload.payload.role,
      };
    case 'user.login/rejected':
      return {
        ...state,
        signingIp: false,
        error: action.error,
      };

    case 'user/unLogin/fulfilled':
      return {
        ...state,
        token: null,
        role: null,
      };

    default:
      return state;
  }
};

export default user;

export const registration = (data: any) => {
  return async (dispatch: any) => {
    dispatch({ type: 'user/registration/pending' });

    try {
      const response = await fetch(
        'http://localhost:5000/api/user/registration',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );
      const json = await response.json();
      dispatch({ type: 'user/registration/fulfilled', payload: json });
    } catch (e: any) {
      dispatch({ type: 'user/registration/rejected', error: e.toString() });
    }
  };
};

export const login = (data: any) => {
  return async (dispatch: any) => {
    dispatch({ type: 'user/login/pending' });

    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const json = await response.json();
      dispatch({ type: 'user/login/fulfilled', payload: json });
    } catch (e: any) {
      dispatch({ type: 'user/login/rejected', error: e.toString() });
    }
  };
};

export const unLogin = () => {
  return (dispatch: any) => {
    try {
      return dispatch({ type: 'user/unLogin/fulfilled' });
    } catch (e) {}
  };
};
