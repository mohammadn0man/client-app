import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { LoadAllQuestions } from '../actions/QuestionAction';

export const ViewQuestion = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    function getData() {
        if (!props.state.questionState.isAllLoaded) {
            dispatch(LoadAllQuestions());
        }
        console.log(props.state.questionState);
        let arr = props.state.questionState.questions.filter(
            (q) => q.questionId == id
        );
        arr = arr = arr.values();
        for (let val of arr) {
            arr = val;
        }
        return arr;
    }

    const currentVal = getData();

    useEffect(() => {

    }, [])

    return (
        <div>
            { props.state.questionState.isAllLoaded ? (
                <React.Fragment>
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title">
                                {currentVal.title}
                            </h2>
                            <h5 className="card-title mt-4">
                                {"Subject : " + currentVal.subject}
                            </h5>
                            <p className="card-title text-uppercase font-weight-bold mt-4">
                                {"Product : " + currentVal.product.name}
                            </p>
                            <div style={{ whiteSpace: 'pre-line' }}>
                                <p className="card-text mt-4 mb-5">
                                    {currentVal.text}
                                </p>
                            </div>
                            <p className="card-text ml-auto" style={{ float: "left" }}>
                                {"Posted on : " + currentVal.creationDate}
                            </p>
                            <p className="card-text ml-auto font-italic" style={{ float: "right" }}>
                                {"From : " + currentVal.user.fullName}
                            </p>
                        </div>
                    </div>
                    <div className="card shadow">
                        <div className="card-body">
                            <button className="btn btn-warning text-white">
                                Load comment
                    </button>
                        </div>
                    </div>
                </React.Fragment>
            ) : (
                <h3>Please wait</h3>
            )}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        register: () => {
            // dispatch(RegisterAuthAction(userState, history, setErrorHandler));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewQuestion);