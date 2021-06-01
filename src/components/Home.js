import axios from 'axios';
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { LoadAllQuestions } from '../actions/QuestionAction';

function Home(props) {
    const { loadAllQuestions } = props;

    useEffect(() => {
        loadAllQuestions();
    }, []);

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        questions: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllQuestions: () => {
            dispatch(LoadAllQuestions());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);