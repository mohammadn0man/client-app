import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Dropdown from 'react-dropdown';
import axios from "axios";

export default function AskQuestion() {
    let history = useHistory();
    const dispatch = useDispatch();
    const [question, setQuestion] = useState({});
    const [options, setOptions] = useState([]);
    const [product, setProduct] = useState([]);

    const createPost = async (e) => {
        e.preventDefault();
        console.log(question);
        try {
            const res = await axios.post("/ask_question", question);
            console.log(res.data);
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    function getByValue(arr, value) {
        var result = arr.filter(function (o) { return o.name == value; });
        return result ? result[0] : null; // or undefined
    }

    useEffect(async () => {
        const res = await axios.get("/all_product");
        const val = res.data;
        setProduct(val);
        let result = val.map(a => a.name);
        setOptions(result);
    }, [])

    const defaultOption = options[0];

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
                            // required
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
                            // required
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
                            // required
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

