import questionReducer from './QuestionReducer';
import authReducer from './AuthReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    authState: authReducer,
    questionState: questionReducer
});