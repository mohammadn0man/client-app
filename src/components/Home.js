import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { LoadAllQuestions } from '../actions/QuestionAction';
import Question from './Question';
import Dropdown from 'react-dropdown';

const SortTypes = {
    CREATION_DATE: "Creation Date",
    CREATION_DATE_DESC: "Most Recent",
    USER_NAME: "User Name",
    PRODUCT_NAME: "Product Name"
}

function Home(props) {
    const { loadAllQuestions, questionState } = props;
    const [searchVal, setSearchVal] = useState('');
    const [sort, setSort] = useState('');
    const options = Object.values(SortTypes);

    const changeSortParam = (value) => {
        switch (value) {
            case SortTypes.CREATION_DATE:
                setSort("creationDate");
                break;
            case SortTypes.CREATION_DATE_DESC:
                setSort("creationDate,desc");
                break;
            case SortTypes.USER_NAME:
                setSort("user.fullName");
                break;
            case SortTypes.PRODUCT_NAME:
                setSort("product.name");
                break;
            default:
                setSort("creationDate");
                break;
        }
    }

    useEffect(() => {
        loadAllQuestions(searchVal, sort);
    }, [searchVal, sort]);

    return (
        <div>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col col-lg-2">
                        <div className="">
                            <input
                                className="form-control mb-4"
                                value={searchVal}
                                onChange={e => {
                                    setSearchVal(e.target.value);
                                }}
                                placeholder="Type something to search"
                            />
                        </div>
                    </div>
                    <div className="col-md-auto mt-2">
                        Sort By :
                    </div>
                    <div className="col col-lg-2">
                        <div className=" form-control dropdown mb-4 ">
                            <Dropdown
                                className=""
                                options={options}
                                required
                                value={options[0]}
                                placeholder="Select an option"
                                onChange={(event) => {
                                    changeSortParam(event.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {questionState.isAllLoaded || questionState.questions.length > 0 ? (
                <React.Fragment>
                    <table className="table shadow">
                        <tbody>
                            {questionState.questions.map((question) => (
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
        loadAllQuestions: (val, sort) => {
            dispatch(LoadAllQuestions(val, sort));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);