
export const initialState = {
  currentUser: null,
  userData: null,
  loading: true,
  error: null,
};

export default function authReducer(state, action) {
  switch (action.type) {
    case "SET_ERROR": {
      return {
        ...state,
        error: action.payload,
      };
    }
    case "SET_LOADING": {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case "SET_CURRENT_USER": {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    case "SET_USER_DATA": {
      return {
        ...state,
        userData: action.payload,
      };
    }
    case "RESET_STATE": {
      return initialState;
    }
    default:
      return state;
  }
}
