import {configureStore} from '@reduxjs/toolkit'
import movieReducer from './reducers/movieSlice'  //movieSlice에서 리듀서 가져오기
import logger from 'redux-logger'


export default configureStore({
    reducer:{
        movie: movieReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})