import React from 'react'

const Reply = ({ reply }) => {
    return (
        <tr>
            <td className="align-middle">
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
