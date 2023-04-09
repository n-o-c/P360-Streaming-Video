import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID,
  ClientId: process.env.REACT_APP_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

export const registerUser = (email, password) => dispatch => {
  const attributeList = [];

  const dataEmail = {
    Name: 'email',
    Value: email,
  };

  const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

  attributeList.push(attributeEmail);

  userPool.signUp(email, password, attributeList, null, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: result.user,
    });
  });
};

export const confirmUser = (email, code) => dispatch => {
  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.confirmRegistration(code, true, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    dispatch({
      type: 'CONFIRM_SUCCESS',
      payload: result,
    });
  });
};

export const loginUser = (email, password) => dispatch => {
  const userData = {
    Username: email,
    Pool: userPool,
  };

  const authenticationData = {
    Username: email,
    Password: password,
  };

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: result => {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: result,
      });
    },

    onFailure: err => {
      console.log(err);
    },
  });
};

export const logoutUser = () => dispatch => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    cognitoUser.signOut();
  }
  dispatch({
    type: 'LOGOUT_SUCCESS',
  });
};

