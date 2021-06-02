import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Reply from './Reply'
import { LoadAllQuestions, LoadReply } from '../actions/QuestionAction';
import AddReply from './AddReply';

export const ViewQuestion = (props) => {
    const { id } = useParams();
    const { loadReply } = props;
    const dispatch = useDispatch();
    function getData() {
        if (!props.state.questionState.isAllLoaded) {
            dispatch(LoadAllQuestions());
        }
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
        loadReply(id);
    }, [props.state.questionState.replies])

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
                            <p className="card-text ml-auto go-left" >
                                {"Posted on : " + currentVal.creationDate}
                            </p>
                            <p className="card-text ml-auto font-italic go-right">
                                {"From : " + currentVal.user.fullName}
                            </p>
                        </div>
                    </div>
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="card-title">
                                <h4>Answers</h4>
                            </div>
                            <div className="card-text ml-auto">
                                {props.state.questionState.isReplyLoaded ? (
                                    props.state.questionState.replies.length < 1 ? (
                                        <React.Fragment>
                                            <p className="font-weight-light font-italic">No Replies yet.</p>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <table className="table border">
                                                <tbody>
                                                    {props.state.questionState.replies.map((reply) => (
                                                        <Reply
                                                            reply={reply}
                                                            key={reply.replyId}
                                                        />
                                                    ))}
                                                </tbody>
                                            </table>
                                        </React.Fragment>
                                    )
                                ) : (
                                    <React.Fragment>
                                        <p className="font-weight-light font-italic">Loading Replies....</p>
                                    </React.Fragment>
                                )}
                            </div>
                            {props.state.authState.isLoggedIn ?
                                (
                                    <React.Fragment>
                                        <AddReply
                                            flag={props.state.questionState.replies.length < 1}
                                            userId={props.state.authState.user.userId}
                                            questionId={currentVal.questionId}
                                        />
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                    </React.Fragment>
                                )}
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
        loadReply: (id) => {
            dispatch(LoadReply(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewQuestion);