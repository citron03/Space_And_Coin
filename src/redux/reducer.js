import {ADD_BOOKMARK, REMOVE_BOOKMARK} from "./action";
import {initialBookmark} from "./state";
import {combineReducers} from 'redux';

const bookmarkReducer = (state = initialBookmark, action) => {

    let count = state.count;
    switch (action.type) {
        // 북마크 추가
        case ADD_BOOKMARK:
            console.log(action.payload);
            return {
                ...state,
                count: count + 1,
            };
        // 북마크 제거
        case REMOVE_BOOKMARK:
            console.log(action.payload);
            return {
                ...state,
                count: count - 1,
            };
        default:
            return state;
    }
}

const reducer = combineReducers({bookmarkReducer});

export default reducer;