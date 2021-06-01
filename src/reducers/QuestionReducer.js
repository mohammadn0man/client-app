import { QuestionActionType } from "../actions/QuestionAction";

const questionState = {
    currentQuestion: {
        userId: "",
        productId: "",
        subject: "",
        text: "",
        title: ""
    },
    questions: []
};

const questionReducer = (state = questionState, action) => {
    switch (action.type) {
        case QuestionActionType.ASK_QUESTION:
            const addedQuestion = action.payload;
            return {
                ...state,
                currentQuestion: addedQuestion,
            }


        case QuestionActionType.LOAD_ALL_QUESTIONS:
            const allQuestions = action.payload;
            return {
                ...state,
                questions: allQuestions,
            }

        default:
            return state;
    }
}

export default questionReducer;