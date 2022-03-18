import { useSelector } from 'react-redux';
// redux로 체크한 스탬프 데이터 관리
// CryptoStamp로 기록한 데이터 뿌려준다.

const CryptoBookmarks = () => {

    let state = useSelector(state => state.bookmarkReducer);
    // combineReducers로 결합한 reducer중에서 사용할 reducer 선택
    console.log("state는 : ", state);
    
    return(
        <div>기록 목록</div>
    );
}

export default CryptoBookmarks;