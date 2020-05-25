export const authInitialState = {
  isLoggedIn: false,
  user: null,
  token: null,
  tokenExpiration: null,
  error: null,
  signUpMode: false,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };

    case 'ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'SIGN_UP':
      return {
        ...state,
        signUpMode: !state.signUpMode,
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
