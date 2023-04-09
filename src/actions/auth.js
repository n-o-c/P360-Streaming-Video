import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

import { Auth } from 'aws-amplify';

// Load User
export const loadUser = () => async dispatch => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    dispatch({ type: USER_LOADED, payload: user });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const register = ({ email, password }) => async dispatch => {
  try {
    const { user } = await Auth.signUp({
      username: email,
      password
    });

    dispatch({ type: REGISTER_SUCCESS, payload: user });
  } catch (err) {
    dispatch({ type: REGISTER_FAIL });
  }
};

// Login User
export const login = ({ email, password }) => async dispatch => {
  try {
    const user = await Auth.signIn(email, password);
    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout User
export const logout = () => async dispatch => {
  try {
    await Auth.signOut();
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};
