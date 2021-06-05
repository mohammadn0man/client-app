import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { LoadAllQuestions } from '../actions/QuestionAction';
import Question from './Question';
import Dropdown from 'react-dropdown';
import Footer from './Footer';

const SortTypes = {
    CREATION_DATE: "Creation Date",
    CREATION_DATE_DESC: "Most Recent",
    USER_NAME: "User Name",
    PRODUCT_NAME: "Product Name",
    SUBJECT: "Subject",
    TITLE: "Title",
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
            case SortTypes.TITLE:
                setSort("title");
                break;
            case SortTypes.SUBJECT:
                setSort("subject");
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
                    <div className="col-xs-12 col-sm-12 col-md-8">
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
                    <div className="col-xs-4 col-sm-4 col-md-1 mt-2">
                        <p>Sort By :</p>
                    </div>
                    <div className="col-xs-8 col-sm-8 col-md-3">
                        <div className="form-control dropdown mb-4 ">
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
            <Footer />
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