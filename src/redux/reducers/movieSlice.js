import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:'movie',
    initialState: {
        popularMovies: [],
        topRatedMovies: [],
        upcomingMovies: [],
        genreList: []
    },
    reducers:{
        initData: (state, action) => {   // initData라는 리듀서 함수를 만들고 상태 업데이트!
            state.popularMovies = action.payload.p;    // Home.jsx에서 { popularMovies : res.data } 라는 payload값 넣어줬음 >> state.popularMovies = res.data로 상태 업데이트
            state.topRatedMovies = action.payload.t;
            state.upcomingMovies = action.payload.u;
            state.genreList = action.payload.g;

            // 상태 업데이트 후, 콘솔에 출력
            console.log({
              popular: state.popularMovies,
              topRated: state.topRatedMovies,
              upcoming: state.upcomingMovies
          });
          },
        resetState: (state) => {
            state.popularMovies = {};
            state.topRatedMovies = {};
            state.upcomingMovies = {};
          }  // 상태를 초기화하는 액션
        },
      });

export const { initData, resetState } = movieSlice.actions
export default movieSlice.reducer