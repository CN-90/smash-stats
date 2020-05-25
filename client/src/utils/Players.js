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

  dispatch({
    type: 'SET_USER',
    payload: returnedUser.data.data.currentUser,
  });

  userInfo.user = returnedUser.data.data.currentUser;
  storeUserInfo(userInfo);
};
