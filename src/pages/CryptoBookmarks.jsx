import {useSelector} from 'react-redux';
import CryptoBookmark from '../components/CryptoBookmark';
import './CryptoBookmarks.css';
import {useState, useEffect} from 'react';
import Modal from '../components/Modal';
import Loding from '../components/Loding';
// redux로 체크한 스탬프 데이터 관리 CryptoStamp로 기록한 데이터 뿌려준다.

const CryptoBookmarks = () => {

    let state = useSelector(state => state.bookmarkReducer);
    // combineReducers로 결합한 reducer중에서 사용할 reducer 선택
    const [modalOn, setModalOn] = useState(false);

    // useEffect cleanup function
    useEffect(() => {
        return () => setModalOn(false);
      }, []);

    return (
        <div>
            <p>북마크한 암호화폐 가격</p>
            {
                modalOn
                    ? <Modal message={"선택하신 북마크가 삭제되었습니다."}/>
                    : <Loding text={" 북마크 목록입니다. "}/>
            }
            <div className='bookmark-frame'>
                {
                    state
                        .cryptocurrency
                        .map(
                            (el, idx) => <CryptoBookmark
                                key={idx}
                                idx={idx}
                                data={el.data}
                                modalTurnOn={(el) => setModalOn(el)}/>
                        )
                }
            </div>
        </div>
    );
}

export default CryptoBookmarks;