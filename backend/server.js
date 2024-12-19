const express = require('express');
const favoriteRouter = require('./routes/favorites');
const cors = require('cors');
const app = express();
const indexRouter = require('./routes')

// CORS 미들웨어 적용 (모든 라우터 전에 추가)
app.use(cors());

// 쿼리스트링 및 JSON 형식의 데이터 파싱
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// 리액트 프로젝트 경로 설정
const path = require('path')
app.use(express.static(path.join(__dirname,'..','frontend','build')));
													
// 루트 경로에 라우터 연결
app.use('/', indexRouter)
app.use('/api', favoriteRouter);

// 포트 설정
app.set('port', process.env.PORT || 3001)
app.listen(app.get('port'), ()=>{
    console.log(`Server is running on ${app.get('port')}`);  
})