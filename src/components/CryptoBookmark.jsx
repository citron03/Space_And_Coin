import './CryptoBookmark.css';

const CryptoBookmark = (data) => {
    const { order, payment, price, date } = data.data;

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

    return(
        <div className='bookmark-data'>
            <p>주문한 암호화폐 : {order}</p>
            <p>금액 : {price} {payment}</p>
            <p>가격 날짜 : {makeDate(date)}</p>
        </div>
    );
}

export default CryptoBookmark;