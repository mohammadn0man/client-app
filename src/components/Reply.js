import React from 'react';
import { FcCheckmark } from 'react-icons/fc';
import { BsFileEarmarkCheck } from 'react-icons/bs'
import axios from 'axios';

const Reply = ({ reply, question, allowMarkingFlag }) => {

    const data = {
        replyId: reply.replyId,
        questionId: question.questionId
    };

    const doSolve = async () => {
        console.log(data);
        const res = await axios.put("/question/solution", data);
        window.location.reload(false);
    }

    return (
        <tr>
            <td className="align-middle">
                {(question.acceptedAnswerId != 0 && question.acceptedAnswerId == reply.replyId) && (
                    <React.Fragment>
                        <div className="go-right">
                            <FcCheckmark size="40" color="green" />
                        </div>
                    </React.Fragment>
                )}
                {allowMarkingFlag && (
                    <React.Fragment>
                        <div className="go-right">
                            <BsFileEarmarkCheck onClick={() => {
                                doSolve();
                            }} className="go-right" size="30" />
                        </div>
                    </React.Fragment>)}
                <h5 className="card-title">
                    {"From : " + reply.user.fullName}
                </h5>
                <p className="card-text">
                    {reply.text}
                </p>
                <p className="card-text ml-auto go-left">
                    {"Posted on : " + reply.creationDate}
                </p>
            </td>
        </tr>
    )
}

export default Reply
