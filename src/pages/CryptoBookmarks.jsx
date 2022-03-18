import { useSelector } from 'react-redux';
import CryptoBookmark from '../components/CryptoBookmark';
import './CryptoBookmarks.css';
// redux로 체크한 스탬프 데이터 관리
// CryptoStamp로 기록한 데이터 뿌려준다.

const CryptoBookmarks = () => {

    let state = useSelector(state => state.bookmarkReducer);
    // combineReducers로 결합한 reducer중에서 사용할 reducer 선택
    // console.log("state는 : ", state.cryptocurrency);
    
    return(
        <div>
            <p>북마크한 암호화폐 가격</p>
            <div className='bookmark-frame'>
                {state.cryptocurrency.map((el, idx) => <CryptoBookmark key={idx} data={el.data}/>)}
            </div>
        </div>
    );
}

export default CryptoBookmarks;