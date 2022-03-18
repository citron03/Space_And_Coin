import './App.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Space from './components/Space';
import Cryptocurrency from './components/Cryptocurrency';

const App = () => {

  return (
    <div className="App">
      <div>우주와 코인</div>
      <BrowserRouter>
        <div>
          <button> <Link to='/'>우주 사진</Link> </button>
          <button> <Link to='/cryptocurrency'>암호화폐 시세 보기</Link> </button>
        </div>
        <Routes>
            <Route exact path="/" element={<Space />} />
            <Route path="/cryptocurrency" element={<Cryptocurrency/>} />
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
