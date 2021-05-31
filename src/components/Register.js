import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom'
import { RegisterAuthAction } from '../actions/AuthAction';

function Register(props) {
    const { user, register } = props;
    const [userState, setUserState] = useState({});
    const history = useHistory();

    const [errorHandler, setErrorHandler] = useState({
        hasError: false,
        message: "",
    });

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h5 className="text-danger">
                            {errorHandler.hasError ? errorHandler.message : null}
                        </h5>
                        <h1 className="text-xs-center">Sign Up</h1>
                        <p className="text-xs-center">
                            <Link to="/login">
                                Have an account?
                            </Link>
                        </p>
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            register(userState, history, setErrorHandler);
                        }}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Full Name"
                                        onChange={(event) => {
                                            const fullName = event.target.value;
                                            setUserState({ ...userState, ...{ fullName } });
                                        }} />
                                </fieldset>

                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="email"
                                        placeholder="Email"
                                        onChange={(event) => {
                                            const userName = event.target.value;
                                            setUserState({ ...userState, ...{ userName } });
                                        }} />
                                </fieldset>

                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="password"
                                        placeholder="Password"
                                        onChange={(event) => {
                                            const password = event.target.value;
                                            setUserState({ ...userState, ...{ password } });
                                        }} />
                                </fieldset>

                                <button
                                    className="btn btn-lg btn-primary pull-xs-right"
                                    type="submit">
                                    Sign up
                                </button>

                            </fieldset>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}



const mapStateToProps = (state) => {
    return {
        user: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        register: (userState, history, setErrorHandler) => {
            dispatch(RegisterAuthAction(userState, history, setErrorHandler));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);