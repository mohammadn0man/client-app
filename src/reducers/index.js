import questionReducer from './QuestionReducer';
import authReducer from './AuthReducer';
import { combineReducers } from 'redux';
import statsReducer from './StatsReducer';

export default combineReducers({
    authState: authReducer,
    questionState: questionReducer,
    statsState: statsReducer,
});