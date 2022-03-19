import axios from 'axios';
import { useState, useEffect } from 'react';
import { orderCrypto, payment } from '../data/cryptocurrency';
import { useDispatch } from 'react-redux';
import { addToBookmark } from '../redux/action';
import Loding from '../components/Loding';
import Modal from './../components/Modal';

const Cryptocurrency = () => {
    const [coinData, setCoinData] = useState([]);
    const [coinOrder, setCoinOrder] = useState("BTC");
    const [coinPayment, setCoinPayment] = useState("KRW"); // KRW 또는 BTC
    const [isLoding, setIsLoding] = useState(false);
    const dispatch = useDispatch(); // 상태 갱신
    const [notify, setNofity] = useState([]);
    // useEffect cleanup function
    useEffect(() => {
        return () => setIsLoding(false);
      }, []);

    // 선택지 변경시 실행
    useEffect(() => {
        setIsLoding(true); // api를 불러오기 전에 로딩창을 띄운다.
        axios.get(`https://api.upbit.com/v1/ticker?markets=${coinPayment}-${coinOrder}`)
            .then(el => {
                setIsLoding(false); // 로딩 끝
                setCoinData(el.data["0"])
            })
            .catch(err => {
                console.log(err);
                setIsLoding(false); // 로딩 끝
            });
    }, [coinOrder, coinPayment]);
    
    const coinSetting = (e) => {
        if(e.target.value !== coinPayment){
            setCoinOrder(e.target.value);
        }
    }
    const paymentSetting = (e) => {
        if(coinOrder !== e.target.value){
            setCoinPayment(e.target.value);
        }    
        // 지불 수단과 구입 코인이 같으면 에러 팝업 띄우기 //
    }

    // 새로고침 버튼
    const refreshing = () => {
        setIsLoding(true); // api를 불러오기 전에 로딩창을 띄운다.
        axios.get(`https://api.upbit.com/v1/ticker?markets=${coinPayment}-${coinOrder}`)
            .then(el => {
                setIsLoding(false); // 로딩 끝
                setCoinData(el.data["0"])
            })
            .catch(err => console.log(err));
    }
    // console.log(coinData);

    const notifyModalControl = () => {
        setNofity([...notify, `${coinPayment} to ${coinOrder} 북마크에 추가되었습니다`]);
        setTimeout(() => {
            setNofity(notify.slice(1));
        }, 5000); // 시간이 지난 뒤 출력한 모달 메세지 삭제
    }

    const appendToBookmark = () => {
        let time = new Date(coinData.trade_timestamp); // 타임 스탬프 날짜 변환
        dispatch(addToBookmark(
            {
                // 객체 형식으로 저장
                "order" : coinOrder, 
                "payment": coinPayment, 
                "price": coinData.trade_price,
                "date": time,
            })); // action 객체
            notifyModalControl(); // 알림 모달
    }

    return (
    <div>
        <p>현재 찜 개수 {}</p>
        <span>구매할 암호화폐</span>
        <div>
            <select onChange={coinSetting}>
                {orderCrypto.map((el, idx) => <option key={idx} value={el}>{el}</option>)}
            </select>
            <span>지불 수단</span>
            <select onChange={paymentSetting}>
                {payment.map((el, idx) => <option key={idx} value={el}>{el}</option>)}
            </select>
        </div>
        {
        isLoding ? <Loding/> : 
                <div>
                <span> 거래 가격 : {coinData.trade_price} {coinPayment}</span>
                <button onClick={refreshing}>가격 갱신</button>
                <button onClick={appendToBookmark}>지금 데이터 기록 하기</button>
            </div>
            }
        {notify ? notify.map((el, idx) => <Modal key={idx} message={el} />) : null}
    </div>
    )
}

export default Cryptocurrency;