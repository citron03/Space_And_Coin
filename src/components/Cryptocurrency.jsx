import axios from 'axios';
import { useState, useEffect } from 'react';
import {orderCrypto, payment} from '../data/cryptocurrency';
import { useSelector } from 'react-redux';


const Cryptocurrency = () => {
    const [coinData, setCoinData] = useState([]);
    const [whatCoinOrder, setWhatCoinOrder] = useState("BTC");
    const [whatCoinPayment, setWhatCoinPayment] = useState("KRW"); // KRW 또는 BTC

    // 선택지 변경시 실행
    useEffect(() => {
        axios.get(`https://api.upbit.com/v1/ticker?markets=${whatCoinPayment}-${whatCoinOrder}`)
            .then(el => setCoinData(el.data["0"]))
            .catch(err => console.log(err));
    }, [whatCoinOrder, whatCoinPayment]);
    
    const coinSetting = (e) => {
        if(e.target.value !== whatCoinPayment){
            setWhatCoinOrder(e.target.value);
        }
    }
    const paymentSetting = (e) => {
        if(whatCoinOrder !== e.target.value){
            setWhatCoinPayment(e.target.value);
        }    
        // 지불 수단과 구입 코인이 같으면 에러 팝업 띄우기 //
    }

    // 새로고침 버튼
    const refreshing = () => {
        axios.get(`https://api.upbit.com/v1/ticker?markets=${whatCoinPayment}-${whatCoinOrder}`)
        .then(el => setCoinData(el.data["0"]))
        .catch(err => console.log(err));
    }
    // console.log(coinData);

    let state = useSelector(state => state.bookmarkReducer);
    // combineReducers로 결합한 reducer중에서 사용할 reducer 선택
    console.log("state는 : ", state);

    return (
    <div>
        <p>현재 찜 개수 {}</p>
        <span>구매할 암호화폐</span>
        <select onChange={coinSetting}>
            {orderCrypto.map((el, idx) => <option key={idx} value={el}>{el}</option>)}
        </select>
        <span>지불 수단</span>
        <select onChange={paymentSetting}>
            {payment.map((el, idx) => <option key={idx} value={el}>{el}</option>)}
        </select>
        <div>
            <span> 거래 가격 : {coinData.trade_price} {whatCoinPayment}</span>
            <button onClick={refreshing}>가격 갱신</button>
            <button onClick={null}>지금 데이터 기록 하기</button>
        </div>
    </div>
    )
}

export default Cryptocurrency;