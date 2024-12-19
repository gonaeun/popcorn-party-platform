import 'bootstrap/dist/css/bootstrap.min.css';   // App.css 위쪽에 불러오기
import './App.css';
import { useState, useEffect } from 'react';
// import api from './api'  // axios 사용할거면, 우리가 만든 api로 불러오기
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Navibar from './components/Navibar';
import Favorite from './pages/Favorite';
import Login from './pages/Login';
import Join from './pages/Join';

function App() {
  const userId = 1; // 하드코딩된 사용자 ID (테스트용)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  // 로그인 상태 초기화
  useEffect(() => {
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 확인
    if (token) {
      setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 설정
    }
  }, []);

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 삭제
    setIsLoggedIn(false); // 로그인 상태 초기화
    alert('로그아웃 되었습니다.');
  };

  // 통신 설명해주시느라 필기했던 부분~!
  // const getMovieData = async() =>{
  //   const API_URL = '/movie/popular?language=ko-KR&page=1';  // 사이트에서 url이 쿼리스트링형식인것 확인 >> 해당 params를 쿼리스트링형식으로 적어주기
  //   // const res = await axios   // axios 사용할거면, 우리가 만든 api로 불러오기
  //   const res = await api.get(API_URL)   //api에 baseURL까진 적혀있으니까 API_URL로는 그이후의 주소만 있으면 됨

  //   console.log('getMovieData()', res.data);
    
  // }

  // useEffect(()=>{
  //   getMovieData()
  // },[])

  return (
    <div>
      <Navibar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/movies/:id' element={<MovieDetail/>}/>
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
        <Route path='/join' element={<Join/>}/>
        <Route path="/favorite" element={<Favorite userId={userId} />} />
      </Routes>
    </div>
  );
}

export default App;
