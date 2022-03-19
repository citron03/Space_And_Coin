import axios from 'axios';
import { useState, useEffect } from 'react';
import Loding from '../components/Loding';

const Space = () => {
    const [spacePicetureData, setSpacePicetureData] = useState({});
    const [isLoding, setIsLoding] = useState(false); // 로딩
    const [explanation, setExplanation] = useState(""); // 번역 데이터 저장
    const [isTranslate, setIsTranslate] = useState(false); // 번역

    // useEffect cleanup function
    useEffect(() => {
      return () => setIsLoding(false);
    }, []);

    // GET 요청 후 데이터 상태에 저장, useEffect를 통해 처음 한 번만 GET 요청을 보낸다.
    useEffect(() => {
      setIsLoding(true); // 로딩
      axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_KEY}&count=1`)
        .then(el => {
          setSpacePicetureData(el.data["0"]); // 사진 데이터를 저장한다.
          setIsLoding(false); // 로딩 끝
        }).catch(err => {
          console.log(err);
          setIsLoding(false); // 로딩 끝
      });
    }, []);

    useEffect(() => {
      // 카카오 번역
      // console.log(spacePicetureData.explanation);
      if(spacePicetureData.explanation){  // 우주 데이터를 받아오면 번역 시작
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `KakaoAK ${process.env.REACT_APP_KAKAO_KEY}`
        }
        const params = new URLSearchParams();
        params.append('src_lang', 'en');
        params.append('target_lang', 'kr');
        params.append('query', spacePicetureData.explanation);

        setIsLoding(true); // 로딩

        axios.post(`https://dapi.kakao.com/v2/translation/translate`, params, {headers})
          .then(el => {
          setExplanation(el.data.translated_text);
          setIsLoding(false); // 로딩 끝
          })
          .catch(err => {
            console.log(err);
            setIsLoding(false); // 로딩 끝      
          }) 
      }}, [spacePicetureData]);

    const translateBtn = () => {
      setIsTranslate(!isTranslate); // 번역 교체
    }

    const { url, title, copyright } = spacePicetureData; // 객체 구조분해 할당
    // 파파고 API로 영어 설명 번역하기
    return (
    <>
      <div>우주 사진 from NASA</div>
        {isLoding ? <Loding /> : 
        <div>
          <img src={url} alt={title} />
          {copyright ?
             <p>copyright : {copyright}</p> : null}
          <div>
            {isTranslate ? 
              <p>{explanation}</p> : 
              <p>{spacePicetureData.explanation}</p>
            }
          </div>
          <button onClick={translateBtn}>번역 하기</button>
        </div>
        }
    </>
    );
}

export default Space;