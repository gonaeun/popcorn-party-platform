import React from 'react'
import api from '../api' 
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initData } from '../redux/reducers/movieSlice';
import Banner from '../components/Banner';
import MovieSlide from '../components/MovieSlide';

const Home = () => {

  const {popularMovies, topRatedMovies, upcomingMovies} = useSelector(state => state.movie)   // REDUX에 저장된 데이터를 사용하기 위해 useSelector
  // const popularMovies = useSelector(state => state.movie.popularMovies)  
  // const topRatedMovies = useSelector(state => state.movie.topRatedMovies)
  // const upcomingMovies = useSelector(state => state.movie.upcomingMovies)
  // useSelector 사용할 때, 내 코드와 다르게 세가지 정보를 한꺼번에 가져올거면 state.movie까지만 접근해야 세가지 다 꺼내올 수 있음

  const dispatch = useDispatch();  // store에서 변경사항 요청

  const fetchMovieData = async () => {
    // 3가지 정보를 동시에 받아와서 한번에 업데이트가 되도록 >> async~await 대신에 async~promise.all

    // const res = await axios   // axios 사용할거면, 우리가 만든 api로 불러오기

    // const popularApi = await api.get('/movie/popular?language=ko-KR&page=1'); 
    // const topRatedApi = await api.get('/movie/top_rated?language=ko-KR&page=1');
    // const upcomingApi = await api.get('/movie/upcoming?language=ko-KR&page=1');

    const popularApi = api.get('/movie/popular?language=ko-KR&page=1'); 
    const topRatedApi = api.get('/movie/top_rated?language=ko-KR&page=1');
    const upcomingApi = api.get('/movie/upcoming?language=ko-KR&page=1');
    const genreApi = api.get('/genre/movie/list?language=ko');

    //Promise.all([]): 동시에 여러 개의 API호출을 해야 할 경우 사용
    // 하나라도 통신과정에서 오류가 발생하면 모든 요청이 reject(거절) 되는 방식
    const [popular, topRated, upcoming, genre] = await Promise.all([popularApi, topRatedApi, upcomingApi, genreApi])
    
    console.log(popular);
    console.log(topRated);
    console.log(upcoming);
    // 정보가 변수에 담겨서 저장됨 확인
    // 콘솔로그에서 state:200 >> 통신 문제 없음
    
    // 데이터를 하나의 객체로 묶어서 initData에 전달
    dispatch(initData({   // 객체형태로 {}
      p:popular.data.results,
      t:topRated.data.results,
      u:upcoming.data.results,
      g:genre.data.genres // store에 저장. genre키에 데이터 넣어주는 과정
      // popularMovies: popularApi.data,    // 데이터를 객체 형태로 만들어 initData 액션에 전달  //{popularMovies : data}라는 payload값 입력함. REDUX에 업데이트됨
      // topRatedMovies: topRatedApi.data,
      // upcomingMovies: upcomingApi.data
    }));
  };



  useEffect(() => {
    fetchMovieData();
  }, []);

  
  return (
    <div>
      {/* popularMovies 배열이 비어있지 않을 경우에만 Banner를 렌더링하도록, length로 판단! */}
      {popularMovies.length > 0 ? 
      <div>
        <Banner data={popularMovies[0]}/>

        <h3 className="section-title">인기 있는 영화</h3>
        <MovieSlide list={popularMovies}/>
        <h3 className="section-title">평점이 높은 영화</h3>
        <MovieSlide list={topRatedMovies}/>
        <h3 className="section-title">개봉 예정 영화</h3>
        <MovieSlide list={upcomingMovies}/>
      </div>
      :
      ''}
    </div>
  );
};

export default Home;

// const Home = () => {
//   const dispatch = useDispatch();

//     const popularMovieData = async() =>{
//         const API_URL1 = '/movie/popular?language=ko-KR&page=1';
//         // const res = await axios   // axios 사용할거면, 우리가 만든 api로 불러오기
//         const res = await api.get(API_URL1)   //api에 baseURL까진 적혀있으니까 API_URL로는 그이후의 주소만 있으면 됨
    
//         // console.log('popularMovies :', res.data);
//         dispatch(initData({ popularMovies : res.data }));  // 데이터를 객체 형태로 만들어 initData 액션에 전달  //{popularMovies : res.data}라는 payload값 입력함
//       }

//       const topRatedMovieData = async() =>{
//         const API_URL2 = '/movie/top_rated?language=ko-KR&page=1';
//         // const res = await axios   // axios 사용할거면, 우리가 만든 api로 불러오기
//         const res = await api.get(API_URL2)   //api에 baseURL까진 적혀있으니까 API_URL로는 그이후의 주소만 있으면 됨
    
//         // console.log('topRatedMovies :', res.data);
//         dispatch(initData({ topRatedMovies: res.data })); 
//       }

//       const upcomingMovieData = async() =>{
//         const API_URL3 = '/movie/upcoming?language=ko-KR&page=1';
//         // const res = await axios   // axios 사용할거면, 우리가 만든 api로 불러오기
//         const res = await api.get(API_URL3)   //api에 baseURL까진 적혀있으니까 API_URL로는 그이후의 주소만 있으면 됨
    
//         // console.log('upcomingMovies :', res.data);
//         dispatch(initData({ upcomingMovies: res.data })); 
//       }
    
//       useEffect(()=>{
//         popularMovieData()
//         topRatedMovieData()
//         upcomingMovieData()
//       },[])


//       return (
//         <div>
//           <h1>Home Page</h1>
//         </div>
//       );
      
// }

// export default Home