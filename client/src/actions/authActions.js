import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from "./actionTypes";
import { getError, clearError } from "./errorActions";

/**
 * Lấy thông tin user hiện tại, sau khi đăng nhập hoặc đăng ký
 * Vấn đề ở đây là tại sao phải lấy user trong khi user đã được set khi đăng nhập hoặc đăng ký
 */

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  // get token
  const token = getState().auth.token;

  fetch("/api/users/user", {
    headers: {
      "x-auth-token": token,
    },
  }).then(async (res) => {
    const payload = await res.json();
    if (res.status === 404) {
      console.log("load user error", payload);
      dispatch(getError(payload.msg, 404));
      dispatch({ type: AUTH_ERROR });
      return;
    }
    dispatch(clearError());
    dispatch({ type: USER_LOADED, payload });
    console.log("get current user", payload);
    return;
  });
};

export const login = (email, password) => (dispatch) => {
  fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(async (res) => {
    const e = await res.json();
    if (res.status === 404) {
      console.log("login fail", e.msg);
      dispatch(getError(e.msg, 404));
      dispatch({ type: LOGIN_FAIL });
      return;
    }
    console.log("login success");
    dispatch(clearError());
    dispatch({ type: LOGIN_SUCCESS, payload: e });
    return;
  });
};

export const register = (name, email, password) => (dispatch) => {
  fetch("/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(async (res) => {
    const e = await res.json();
    if (res.status === 404) {
      dispatch(getError(e.msg, 404));
      dispatch({ type: REGISTER_FAIL });
      return;
    }
    dispatch(clearError());
    dispatch({ type: REGISTER_SUCCESS, payload: e });
    return;
  });
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
};
