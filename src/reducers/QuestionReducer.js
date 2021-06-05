import { QuestionActionType } from "../actions/QuestionAction";

const questionState = {
    currentQuestion: {
        userId: "",
        productId: "",
        subject: "",
        text: "",
        title: ""
    },
    isAllLoaded: false,
    questions: [],
    isReplyLoaded: false,
    replies: [],
};

const questionReducer = (state = questionState, action) => {
    switch (action.type) {
        case QuestionActionType.ASK_QUESTION:
            const currentQuestion = action.payload;
            return {
                ...state,
                currentQuestion,
            }

        case QuestionActionType.LOAD_ALL_QUESTIONS:
            const questions = action.payload;
            return {
                ...state,
                isAllLoaded: true,
                questions,
            }

        case QuestionActionType.LOAD_REPLY:
            const replies = action.payload;
            return {
                ...state,
                isReplyLoaded: true,
                replies,
            }
        default:
            return state;
    }
}

export default questionReducer;