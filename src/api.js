import axios from 'axios'

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3',
    headers:{
        accept: 'application/json',  //json으로 받고싶어요
        Authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`  // 토큰 위치에 내 토큰 안보이도록 .env에 적은 코드명 가져오기
        // headers는 사이트 코드 복붙
    }
})

export default api