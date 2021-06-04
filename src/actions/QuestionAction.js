import axios from "axios";

const QuestionActionType = {
    ASK_QUESTION: "ASK_QUESTION",
    LOAD_ALL_QUESTIONS: "LOAD_ALL_QUESTIONS",
    LOAD_REPLY: "LOAD_REPLY",
    POST_REPLY: "POST_REPLY"
}

const LoadAllQuestions = (query, sort) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/get_all_question?query=${query}&sort=${sort}`, {
                headers: { Authorization: "" }
            });
            dispatch({ type: QuestionActionType.LOAD_ALL_QUESTIONS, payload: res.data })
        } catch (error) {
            console("err : ", error);
        }
    }
}

const LoadReply = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/question_reply/${id}`, {
                headers: { Authorization: "" }
            });
            dispatch({ type: QuestionActionType.LOAD_REPLY, payload: res.data })
        } catch (error) {
            console("err : ", error);
        }
    }
}

const PostReply = (reply) => {
    return async () => {
        try {
            const res = await axios.post("/add_reply", reply);
            const { data } = res;
            console.log("res data :", data);
        } catch (error) {
            console.log("err : " + error);
        }
    }
}

const AskQuestionAction = (question, history) => {
    return async (dispatch) => {
        try {
            const res = await axios.post("/ask_question", question);
            const { data } = res;
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
    LoadReply,
    PostReply,
    LoadAllQuestions
};