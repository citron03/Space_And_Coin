import { useDispatch } from 'react-redux';
import { removeFromBookmark } from './../redux/action';
import './CryptoBookmark.css';

const CryptoBookmark = ({data, modalTurnOn, idx}) => {
    const { order, payment, price, date } = data;
    const dispatch = useDispatch();

    const makeDate = (rawDate) => {
        // console.log(typeof rawDate); // object
        let year = `${rawDate.getFullYear()}년 `;
        let month = `${rawDate.getMonth() + 1}월 `;
        let date = `${rawDate.getDate()}일 `;
        let hours = `${rawDate.getHours()}시 `;
        let minutes = `${rawDate.getMinutes()}분 `;
        let seconds = `${rawDate.getSeconds()}초`;
        return year + month + date + hours + minutes + seconds;
    }

    const deleteBookMarkModalOn = (idx) => {
        modalTurnOn(true);
        dispatch(removeFromBookmark(idx)); // 해당 북마크 삭제
        setTimeout(() => {
            modalTurnOn(false); // 3초뒤 컴포넌트 삭제
        }, 3000);
    }

    return(
        <div className='bookmark-data'>
            <p>주문한 암호화폐 : {order}</p>
            <p>금액 : {price} {payment}</p>
            <p>가격 날짜 : {makeDate(date)}</p>
            <button onClick={() => deleteBookMarkModalOn(idx)}>북마크 삭제</button>
        </div>
    );
}

export default CryptoBookmark;