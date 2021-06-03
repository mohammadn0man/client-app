import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { PostReply } from '../actions/QuestionAction';

const AddReply = ({ flag, userId, questionId }) => {
    const [reply, setReply] = useState({
        userId: userId,
        questionId: questionId,
    });
    const dispatch = useDispatch();

    const createReply = (e) => {
        e.preventDefault();
        dispatch(PostReply(reply));
        e.target.reset();
        window.location.reload(false);
    }

    return (
        <div>
            {flag ? (
                <React.Fragment>
                    <p className="font-weight-light font-italic">Be first person to answer this.</p>
                </React.Fragment>
            ) : (<p></p>)}
            <form onSubmit={(e) => createReply(e)}>
                <div className="form-group">
                    <textarea
                        className="form-control"
                        placeholder="Detailed Description"
                        required
                        rows="5"
                        onChange={(event) => {
                            const text = event.target.value;
                            setReply({ ...reply, ...{ text } });
                        }}
                    />
                </div>
                <button className="btn btn-primary" type="submit">
                    Post Answer
                </button>
            </form>
        </div>
    )
}

export default AddReply;