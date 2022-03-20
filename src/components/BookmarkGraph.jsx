import {useSelector} from "react-redux";
import Chart from 'chart.js/auto';
import {useEffect, useRef} from "react";

const BookmarkGraph = () => {

    let state = useSelector(state => state.bookmarkReducer);

    // 랜덤 색상 만들기
    const getRandomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);
    
    const canvas = useRef(null);

    useEffect(() => {
        let dataObj = {};
        for(let i of state.cryptocurrency){
            let str = i.data.payment + " to " + i.data.order;
            if(dataObj[str]){
                // 이미 있으면 추가
                dataObj[str] = [i.data.price, ...dataObj[str]]
            } else{
                // 새로운 거래 내역
                dataObj[str] = [i.data.price];
            }
        }
    
        const labels = [1, 2, 3, 4, 5];
        const data = {
          labels: labels,
          datasets: []
        };
        // datasets 설정
        for(let i in dataObj){
            data.datasets.push({
                label: i, // 거래 종류
                data: dataObj[i], // price
                fill: false,
                borderColor: getRandomColor(),
                tension: 0.1
            });
        }
        const config = {
            type: 'line',
            data: data,
          };
    
        // 처음 한번만 실행
        const ctx = canvas.current.getContext("2d");   
        new Chart(ctx, config);
    }, []);

    return (
    <div>
        {state.cryptocurrency.length === 0 ? <p>북마크된 데이터가 없습니다.</p> : null}
        <canvas ref={canvas}></canvas> 
    </div>
    );
}

export default BookmarkGraph;