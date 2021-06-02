import React from 'react'
import { Link } from 'react-router-dom';

const Question = ({ question }) => {
    return (
        <tr>
            <td className="align-middle">
                <div className="card-body">
                    <h3 className="card-title">
                        {question.title}
                    </h3>
                    <p className="card-title">
                        {"Subject :  " + question.subject}
                    </p>
                    <p className="card-text">
                        {question.text.length > 300 ? question.text.substring(0, 299) + "  . . . . ." : question.text}
                    </p>
                    <div>
                        <Link to={`/question/view/${question.questionId}`} className="btn btn-warning text-white ml-auto">
                            View Full Post
                        </Link>
                        <p className="card-text ml-auto" style={{ float: "right" }}>
                            {"From : " + question.user.fullName}
                        </p>
                    </div>
                </div>

            </td>
        </tr>
    )
}

export default Question;
