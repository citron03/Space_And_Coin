import './BookmarkNews.css';
import axios from "axios";
import Loding from "./Loding";
import {useState, useEffect} from "react";
import {useSelector} from "react-redux";

const BookmarkNews = () => {

    let state = useSelector(state => state.bookmarkReducer);
    let [querySelect, setQuerySelect] = useState("");
    let [isLoding, setIsLoding] = useState(false);
    let [queryArr, setQueryArr] = useState([]);
    let [news, setNews] = useState([]);

    // useEffect cleanup function
    useEffect(() => {
        return () => setIsLoding(false);
      }, []);


    useEffect(() => {
        let query = new Set(); // 중복 없이

        for(let i of state.cryptocurrency){
            if(i !== undefined){ // 삭제된 북마크 건너뜀
                query.add(i.data.order);
            }
        }
        let arr = Array.from(query.values()); // 유사배열을 배열로
        setQueryArr(arr);
        // 요소가 하나면, 그 값으로 쿼리문 고정
        if(arr.length === 1){
            setQuerySelect(arr[0]);
        }
    }, [state]);

    const settingQuery = (e) => {
        setQuerySelect(e.target.value);
    }

    useEffect(() => {
        if(querySelect.length > 0){
            const headers = {
                "Authorization": "KakaoAK " + process.env.REACT_APP_KAKAO_KEY,
            }
            setIsLoding(true);
            const newsData = axios.get(`https://dapi.kakao.com/v2/search/web?query=${querySelect}&size=3`,{headers});
            newsData.then(el => {
                setIsLoding(false);
                if(el.data){
                    setNews(el.data.documents);
                }else {
                    setNews([]);
                }
            }).catch(err => {
                setIsLoding(false);
                console.log(err);
            })
        }
    }, [querySelect]) // 선택한 코인의 정보가 바뀌면
    return (
    <div>
        <p>관련 글들</p>
        <select onChange={settingQuery}>
            {queryArr.map((el, idx) => <option key={idx} value={el}>{el}</option>)}
        </select>
        <div>
            {isLoding ? <Loding /> : 
                news.map((el, idx) => {
                    return (
                    <div key={idx} className="news-div-container">
                        <p>Title : {el.title}</p>
                        <label className='label-news-content'>contents</label>
                        <p>{el.contents}</p>
                    </div>
                    )
                })
            }
        </div>
    </div>
    )
}

export default BookmarkNews;