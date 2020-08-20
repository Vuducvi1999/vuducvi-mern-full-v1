import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
} from "./../actions/actionTypes";

const initState = {
  token: localStorage.getItem("token"),
  isAuth: false,
  loading: false,
  user: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, loading: true };
    case USER_LOADED:
      return { ...state, loading: false, isAuth: true, user: action.payload };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, isAuth: true, loading: false, ...action.payload };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        isAuth: false,
        loading: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
}
