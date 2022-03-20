import {useSelector} from 'react-redux';
import Bookmark from './Bookmark';
import './BookmarkList.css';
import {useState, useEffect} from 'react';
import Modal from './/Modal';
import Loding from './/Loding';
// redux로 체크한 스탬프 데이터 관리 CryptoStamp로 기록한 데이터 뿌려준다.


const BookmarkList = () => {

    let state = useSelector(state => state.bookmarkReducer);
    // combineReducers로 결합한 reducer중에서 사용할 reducer 선택
    const [modalOn, setModalOn] = useState(false);

    // useEffect cleanup function
    useEffect(() => {
        return () => setModalOn(false);
      }, [state]);

    return (
        <div>
            {
                modalOn
                    ? <Modal message={"선택하신 북마크가 삭제되었습니다."}/>
                    : <Loding text={`현재 북마크 개수: ${state.count}`}/>
            }
            <div className='bookmark-frame'>
                {
                    state
                        .cryptocurrency
                        .map(
                            (el, idx) => <Bookmark
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

export default BookmarkList;