const express = require('express');
const cors = require('cors');
const app = express();
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const favoriteRoutes = require('./routes/favorites');

// CORS 미들웨어 적용 (모든 라우터 전에 추가)
app.use(cors());

// 쿼리스트링 및 JSON 형식의 데이터 파싱
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// 리액트 프로젝트 경로 설정
const path = require('path')
app.use(express.static(path.join(__dirname,'..','frontend','build')));
													
// 루트 경로에 라우터 연결
app.use('/', indexRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);

// 포트 설정
app.set('port', process.env.PORT || 3001)
app.listen(app.get('port'), ()=>{
    console.log(`Server is running on ${app.get('port')}`);  
})