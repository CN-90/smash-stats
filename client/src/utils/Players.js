import axios from 'axios';
import { storeUserInfo } from './Auth';

export const createPlayer = async (playerName, dispatch) => {
  let userInfo = JSON.parse(localStorage.getItem('userData'));

  let returnedUser = await axios.post(
    'http://localhost:5000/api/v1/players',
    {
      name: playerName,
    },
    { headers: { Authorization: `Bearer ${userInfo.token}` } }
  );

  userInfo.user = returnedUser.data.data.currentUser;

  console.log(userInfo.user);
  dispatch({
    type: 'UPDATE_USER',
    payload: userInfo.user,
  });
  storeUserInfo(userInfo);
};

// userInfo.user = response.data.updatedUser;
//     authDispatch({ type: 'SET_USER', payload: userInfo.user });
//     storeUserInfo(userInfo);
