import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationiRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return { token: action.payload, errorMessage: '' };
    case 'signout':
      return { token: null, errorMessage: '' };
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    default:
      return state;
      break;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({
      type: 'signin',
      payload: token,
    });
    navigate('TrackList');
  } else {
    navigate('Signup');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({
    type: 'clear_error_message',
  });
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signup', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({
      type: 'signin',
      payload: response.data.token,
    });
    navigate('TrackList');
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sing up',
    });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signin', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({
      type: 'signin',
      payload: response.data.token,
    });
    navigate('TrackList');
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sing in',
    });
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({
    type: 'signout',
  });
  navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
  authReducer, //Reducer
  { signin, signup, signout, clearErrorMessage, tryLocalSignin }, //Actions
  {
    token: null,
    errorMessage: '',
  } //InitialValue
);
