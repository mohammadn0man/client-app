import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Dropdown from 'react-dropdown';
import axios from "axios";
import { AskQuestionAction } from "../actions/QuestionAction";

const AskQuestion = (props) => {
    const { auth, ask_question } = props;
    let history = useHistory();
    const { userId } = auth.user;
    const [question, setQuestion] = useState({ userId });
    const [options, setOptions] = useState([]);
    const [product, setProduct] = useState([]);

    const createPost = async (e) => {
        e.preventDefault();
        ask_question(question, history);
    };

    function getByValue(arr, value) {
        var result = arr.filter(function (o) { return o.name === value; });
        return result ? result[0] : null; // or undefined
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get("/all_product");
                const val = res.data;
                setProduct(val);
                let result = val.map(a => a.name);
                setOptions(result);
                const { productId } = val[0];
                setQuestion({ ...question, ...{ productId } });
            } catch (err) {
                history.push('/login');
            }
        }
        fetchData();
    }, []);

    return (
        <div className="card border-0 shadow">
            <div className="card-header bg-warning text-white">Ask Question</div>
            <div className="card-body">
                <form onSubmit={(e) => createPost(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            required
                            onChange={(event) => {
                                const title = event.target.value;
                                setQuestion({ ...question, ...{ title } });
                            }}
                        />
                    </div>
                    <div className="form-group dropdown">
                        <Dropdown
                            className="form-control"
                            options={options}
                            required
                            value={options[0]}
                            placeholder="Select an option"
                            onChange={(event) => {
                                const productName = event.value;
                                const { productId } = getByValue(product, productName);
                                setQuestion({ ...question, ...{ productId } });
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Subject"
                            required
                            onChange={(event) => {
                                const subject = event.target.value;
                                setQuestion({ ...question, ...{ subject } });
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            placeholder="Detailed Description"
                            required
                            rows="5"
                            onChange={(event) => {
                                const text = event.target.value;
                                setQuestion({ ...question, ...{ text } });
                            }}
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">
                        Publish
                    </button>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.authState,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        ask_question: (question, history) => {
            dispatch(AskQuestionAction(question, history));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AskQuestion);