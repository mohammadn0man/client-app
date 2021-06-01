import axios from "axios";

const QuestionActionType = {
    ASK_QUESTION: "ASK_QUESTION",
    LOAD_ALL_QUESTIONS: "LOAD_ALL_QUESTIONS"
}

const LoadAllQuestions = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get("/get_all_question", {
                headers: { Authorization: "" }
            });
            dispatch({ type: QuestionActionType.LOAD_ALL_QUESTIONS, payload: res.data })
        } catch (error) {
            console("err : ", error);
        }
    }
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

export {
    QuestionActionType,
    AskQuestionAction,
    LoadAllQuestions
};