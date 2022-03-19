import './Space.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loding from '../components/Loding';

const Space = () => {
    const [spacePicetureData, setSpacePicetureData] = useState({});
    const [isLoding, setIsLoding] = useState(false); // 로딩

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

    const { url, title, copyright, explanation } = spacePicetureData; // 객체 구조분해 할당
    // 파파고 API로 영어 설명 번역하기
    return (
    <>
      <div className='space-picture-tag'>우주 사진 from NASA</div>
        {isLoding ? <Loding /> : 
        <div>
          <img id='space-random-picture' src={url} alt={title} />
          {copyright ?
             <p>copyright : {copyright}</p> : null}
          <div>
              <p>{explanation}</p>
          </div>
        </div>
        }
    </>
    );
}

export default Space;