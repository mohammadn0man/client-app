import axios from "axios";

const QuestionActionType = {
    ASK_QUESTION: "ASK_QUESTION",

}

const AskQuestionAction = (question, history) => {
    return async (dispatch) => {
        console.log(question);
        try {
            const res = await axios.post("/ask_question", question);
            const { data } = res;
            console.log("res data :", data);
            dispatch({ type: QuestionActionType.ASK_QUESTION, payload: question });
            history.push("/");
        } catch (error) {
            console.log("err : " + error);
        }
    }
}

export { QuestionActionType, AskQuestionAction };