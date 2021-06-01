import React, { useState } from 'react';
import { useHistory } from "react-router";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoginAuthAction } from '../actions/AuthAction';

const Login = (props) => {
    const { login } = props;


    const [errorHandler, setErrorHandler] = useState({
        hasError: false,
        message: "",
    });


    const [loginState, setLoginState] = useState({});
    const history = useHistory();

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h5 className="text-danger">
                            {errorHandler.hasError ? errorHandler.message : null}
                        </h5>
                        <h1 className="text-xs-center">Sign In</h1>
                        <p className="text-xs-center">
                            <Link to="/register">
                                Need an account?
                            </Link>
                        </p>
                        <form onSubmit={async (event) => {
                            event.preventDefault();
                            login(loginState, history, setErrorHandler);
                        }}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="email"
                                        placeholder="Email"
                                        onChange={(event) => {
                                            const username = event.target.value;
                                            setLoginState({ ...loginState, ...{ username } });
                                        }} />
                                </fieldset>

                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="password"
                                        placeholder="Password"
                                        onChange={(event) => {
                                            const password = event.target.value;
                                            setLoginState({ ...loginState, ...{ password } });
                                        }} />
                                </fieldset>

                                <button
                                    className="btn btn-lg btn-primary pull-xs-right"
                                    type="submit">
                                    Sign in
                                </button>

                            </fieldset>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        user: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (loginState, history, setErrorHandler) => {
            dispatch(LoginAuthAction(loginState, history, setErrorHandler));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)