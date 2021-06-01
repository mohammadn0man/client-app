import { QuestionActionType } from "../actions/QuestionAction";

const questionState = {
    userId: "",
    productId: "",
    subject: "",
    text: "",
    title: ""
};

const questionReducer = (state = questionState, action) => {
    switch (action.type) {
        case QuestionActionType.ASK_QUESTION:
            const addedQuestion = action.payload;
            const newQuestionState = {
                ...state,
                ...addedQuestion,
            }
            return newQuestionState;

        default:
            return state;
    }
}

export default questionReducer;