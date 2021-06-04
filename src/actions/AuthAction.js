import axios from "axios";

const AuthActionType = {
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAIL: "LOGOUT_FAIL",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
};

const RegisterAuthAction = (userState, history, setErrorHandler) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/user/signup", userState);
      const { data } = res;
      if (data === undefined) { // any non 200 response
        setErrorHandler({
          hasError: true,
          message: res.response.data,
        });
      } else {
        dispatch({ type: AuthActionType.REGISTER_SUCCESS, payload: data });
        history.push("/");
      }
    } catch (error) {
      if (error.response) {
        dispatch({
          type: AuthActionType.REGISTER_FAIL,
          payload: error.response.data,
        });
        setErrorHandler({
          hasError: true,
          message: error.response.data,
        });
      }
      if (error.request) {
        console.log(error);
      }
    }
  };
};

const LoginAuthAction = (loginState, history, setErrorHandler) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/user/authenticate", loginState);
      const { data } = res;
      if (data === undefined) { // any non 200 response
        setErrorHandler({
          hasError: true,
          message: res.response.data,
        });
      } else {
        dispatch({ type: AuthActionType.LOGIN_SUCCESS, payload: data });
        history.push("/");
      }
    } catch (error) {
      if (error.response) {
        dispatch({
          type: AuthActionType.LOGIN_FAIL,
          payload: error.response.data,
        });
      }
      setErrorHandler({ hasError: true, message: error.response.data });
    }
  };
};

const LogOutAuthAction = (history) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/user/logout");
      const { data } = res;
      dispatch({
        type: AuthActionType.LOGOUT_SUCCESS,
        payload: data,
      });
      history.push("/");
    } catch (error) {
      if (error.response) {
        dispatch({
          type: AuthActionType.LOGOUT_FAIL,
          payload: error.response.data,
        });
      }
      history.push("/");
    }
  };
};

export {
  RegisterAuthAction,
  AuthActionType,
  LogOutAuthAction,
  LoginAuthAction,
};
