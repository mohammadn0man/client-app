import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

export const ViewQuestion = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { questionState, authState } = props.state;
    let arr = questionState.questions.filter(
        (q) => q.questionId == id
    );
    arr = arr = arr.values();
    for (let val of arr) {
        arr = val;
    }

    useEffect(() => {

    }, [])

    return (
        <div className="card shadow">
            <div className="card-body">
                <h2 className="card-title">
                    {arr.title}
                </h2>
                <h5 className="card-title mt-4">
                    {"Subject : " + arr.subject}
                </h5>
                <p className="card-title text-uppercase font-weight-bold mt-4">
                    {"Product : " + arr.product.name}
                </p>
                <div style={{ whiteSpace: 'pre-line' }}>
                    <p className="card-text mt-4 mb-5">
                        {arr.text}
                    </p>
                </div>
                <p className="card-text ml-auto" style={{ float: "left" }}>
                    {"Posted on : " + arr.creationDate}
                </p>
                <p className="card-text ml-auto font-italic" style={{ float: "right" }}>
                    {"From : " + arr.user.fullName}
                </p>
            </div>
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