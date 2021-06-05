import { LOAD_STATS } from "../actions/StatsAction";


const statsState = {
    isStatsLoaded: false,
    stats: {},
}

const statsReducer = (state = statsState, action) => {
    switch (action.type) {
        case LOAD_STATS:
            const stats = action.payload;
            return {
                ...state,
                isStatsLoaded: true,
                stats,
            }
        default:
            return state;
    }
}

export default statsReducer;