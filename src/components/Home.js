import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { LoadAllQuestions } from '../actions/QuestionAction';
import Question from './Question';

function Home(props) {
    const { loadAllQuestions, questionState } = props;
    useEffect(() => {
        loadAllQuestions();
    }, []);

    return (
        <div>
            {questionState.isAllLoaded ? (
                <React.Fragment>
                    <table className="table shadow">
                        <tbody>
                            {questionState.questions.map((question) => (
                                <Question question={question} key={question.questionId} />
                            ))}
                        </tbody>
                    </table>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <h4>Nothing to show here...</h4>
                </React.Fragment>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        questionState: state.questionState,
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