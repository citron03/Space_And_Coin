import axios from 'axios';
import { useState, useEffect } from 'react';

const Space = () => {
    const [spacePicetureData, setSpacePicetureData] = useState({});
    // GET 요청 후 데이터 상태에 저장, useEffect를 통해 처음 한 번만 GET 요청을 보낸다.
    useEffect(() => {
      axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_KEY}&count=1`)
        .then(el => setSpacePicetureData(el.data["0"]))
        .catch(err => console.log(err));
    }, []);

    let { url, title, copyright, explanation } = spacePicetureData; // 객체 구조분해 할당
    // 파파고 API로 영어 설명 번역하기
    return (
    <>
      <div>우주 사진 from NASA</div>
      <img src={url} alt={title} />
      {copyright ? <p>copyright : {copyright}</p> : null}
      <div>
          {explanation} 
      </div>
    </>
    );
}

export default Space;