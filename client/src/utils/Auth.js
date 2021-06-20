import axios from 'axios';

export const signIn = async (user, dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/v1/users/login',
      {
        email: user.email,
        password: user.password,
      }
    );
    const userData = {
      user: response.data.data.user,
      token: response.data.token,
    };
    dispatch({ type: 'LOGIN', payload: userData });
    storeUserInfo(userData);
  } catch (err) {
    console.log(err)
    dispatch({ type: 'ERROR', payload: err.response.data.message });
  }
};

export const signOut = () => {
  localStorage.removeItem('userData');
  window.location.reload();
};

export const signUp = async (user, dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/v1/users/signup',
      {
        email: user.email,
        password: user.password,
        passwordConfirm: user.passwordConfirm,
      }
    );

    const userData = {
      user: response.data.data.user,
      token: response.data.token,
    };
    dispatch({ type: 'LOGIN', payload: userData });
    storeUserInfo(userData);
  } catch (err) {
    dispatch({ type: 'SIGN_UP', payload: err.response.data.message });
  }
};

export const storeUserInfo = (user) => {
  localStorage.setItem(
    'userData',
    JSON.stringify({
      user: user.user,
      token: user.token,
    })
  );
};

export const authHttpRequest = async (route, data) => {
  let userInfo = JSON.parse(localStorage.getItem('userData'));
  let returnedData = null;
  try {
    returnedData = await axios.post(route, data, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
  } catch (err) {
    returnedData = { error: err };
  }

  return returnedData;
};

export const setUserInfo = () => {};
