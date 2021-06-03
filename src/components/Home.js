import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { LoadAllQuestions } from '../actions/QuestionAction';
import Question from './Question';

function Home(props) {
    const { loadAllQuestions, questionState } = props;
    const [searchVal, setSearchVal] = useState('');
    useEffect(() => {
        loadAllQuestions(searchVal);
    }, [searchVal]);

    return (
        <div>
            <div>
                <input
                    className="form-control form-control-lg mb-4"
                    value={searchVal}
                    onChange={e => {
                        setSearchVal(e.target.value);
                    }}
                    placeholder="Type something to search"
                />
            </div>
            {questionState.isAllLoaded || questionState.questions.length > 0 ? (
                <React.Fragment>
                    <table className="table shadow">
                        <tbody>
                            {questionState.questions.slice(0).reverse().map((question) => (
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
        loadAllQuestions: (val) => {
            dispatch(LoadAllQuestions(val));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);