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
      const res = await axios.post("/signup", userState);
      const { data } = res;
      console.log(data);
      dispatch({ type: AuthActionType.REGISTER_SUCCESS, payload: data });
      history.push("/");
    } catch (error) {
      console.log(error);
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
      const res = await axios.post("/authenticate", loginState);
      const { data } = res;
      dispatch({ type: AuthActionType.LOGIN_SUCCESS, payload: data });
      history.push("/");
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
      const res = await axios.get("/user_logout");
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
