import { AuthActionType } from "../actions/AuthAction";
import axios from "axios";

const authState = {
    isLoggedIn: false,
    user: {
        userName: "",
        jwt: "",
        userId: ""
    }
}

const getAuthState = () => {
    const auth = localStorage.getItem("auth");
    try {
        const authobj = JSON.parse(auth);
        const { jwt } = authobj.user;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        return authobj;
    } catch (error) {
        return authState;
    }
};

const newAuth = getAuthState();
const authReducer = (state = newAuth, action) => {
    switch (action.type) {
        case AuthActionType.REGISTER_SUCCESS:
            const newAuthState = {
                ...state,
                isLoggedIn: true,
                user: action.payload,
            };
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${action.payload.jwt}`;
            localStorage.setItem("auth", JSON.stringify(newAuthState));
            return newAuthState;

        case AuthActionType.LOGOUT_SUCCESS:
            localStorage.removeItem("auth");
            return authState;

        case AuthActionType.LOGOUT_FAIL:
            localStorage.removeItem("auth");
            return authState;

        case AuthActionType.LOGIN_SUCCESS:
            const loginAuthState = {
                ...state,
                isLoggedIn: true,
                user: action.payload,
            };
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${action.payload.jwt}`;
            localStorage.setItem("auth", JSON.stringify(loginAuthState));
            return loginAuthState;

        case AuthActionType.REGISTER_FAIL:
        default: return state;
    }
}

export default authReducer;