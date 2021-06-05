import axios from "axios";

export const LOAD_STATS = "LOAD_STATS";

export const LoadStats = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/stats/get`, {
                headers: { Authorization: "" }
            });
            dispatch({ type: "LOAD_STATS", payload: res.data })
        } catch (error) {
            console("err : ", error);
        }
    }
}