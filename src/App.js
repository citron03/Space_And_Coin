import './App.css';
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import Space from './pages/Space';
import Cryptocurrency from './pages/Cryptocurrency';
import CryptoBookmarks from './pages/CryptoBookmarks';
import BookmarkList from './components/BookmarkList';
import BookmarkGraph from './components/BookmarkGraph';
import BookmarkNews from './components/BookmarkNews';

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <div id='router-nav-link-container'>
          <NavLink to='/' className='router-nav-link' >우주 사진</NavLink> 
          <NavLink to='/cryptocurrency'className='router-nav-link'>암호화폐</NavLink> 
          <NavLink to='/bookmark'className='router-nav-link'>북마크</NavLink> 
        </div>
        <Routes>
            <Route exact path="/" element={<Space />} />
            <Route path="/cryptocurrency" element={<Cryptocurrency/>} />
            <Route path="/bookmark" element={<CryptoBookmarks/>} />
            <Route path="/bookmark/list" element={<BookmarkList/>} />
            <Route path="/bookmark/graph" element={<BookmarkGraph/>} />
            <Route path="/bookmark/news" element={<BookmarkNews/>} />
        </Routes>
      </BrowserRouter>
      <footer className='font-source-show'>이 웹사이트에 사용된 폰트는 순천시청의 순천체B입니다.</footer>
    </div>
  );
}

export default App;
