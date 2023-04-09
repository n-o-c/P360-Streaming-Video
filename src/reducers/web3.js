import { SET_WEB3 } from '../actions/types';

const initialState = {
  web3: null,
  contracts: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_WEB3:
      return {
        ...state,
        web3: payload.web3,
        contracts: payload.contracts,
      };
    default:
      return state;
  }
}
