import {ADD_BOOKMARK, REMOVE_BOOKMARK} from "./action";
import {initialBookmark} from "./state";
import {combineReducers} from 'redux';

const bookmarkReducer = (state = initialBookmark, action) => {

    let count = state.count;
    switch (action.type) {
        // 북마크 추가
        case ADD_BOOKMARK:
            let newState = {...state}; // 새 객체 생성
            newState.cryptocurrency.push(action.payload); // 데이터 추가
            return {
                ...newState,
                count: count + 1, // 갯수 증가
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