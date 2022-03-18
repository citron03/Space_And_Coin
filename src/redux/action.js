export const ADD_BOOKMARK = "ADD_BOOKMARK";
export const REMOVE_BOOKMARK = "REMOVE_BOOKMARK";

export const addToBookmark = (data) => {
    return {
        type: ADD_BOOKMARK,
        payload: {
            data
        }
    }
}


export const removeFromBookmark = (data) => {
    return {
        type: ADD_BOOKMARK,
        payload: {
            data
        }
    }
}