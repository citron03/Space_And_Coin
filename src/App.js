import './App.css';
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import Space from './pages/Space';
import Cryptocurrency from './pages/Cryptocurrency';
import CryptoBookmarks from './pages/CryptoBookmarks'

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <div id='router-nav-link-div'>
          <NavLink to='/' className='router-nav-link' >우주 사진</NavLink> 
          <NavLink to='/cryptocurrency'className='router-nav-link'>암호화폐 시세 보기</NavLink> 
          <NavLink to='/bookmark'className='router-nav-link'>북마크</NavLink> 
        </div>
        <Routes>
            <Route exact path="/" element={<Space />} />
            <Route path="/cryptocurrency" element={<Cryptocurrency/>} />
            <Route path="/bookmark" element={<CryptoBookmarks/>} />
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
