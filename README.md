# 🍿 Popcorn Party Platform

> 넷플릭스 스타일의 영화 플랫폼

## 📋 프로젝트 개요
- **개인 프로젝트**
- **기간** : 2024.12
- Popcorn Party Platform은 넷플릭스 스타일의 영화 커뮤니티 플랫폼입니다.
TMDB(The Movie Database) API를 활용하여 최신 영화 정보를 제공하고, 사용자가 개인적인 즐겨찾기 목록을 관리할 수 있습니다.

## ✨ 주요 기능

- 🎬 **영화 정보 조회**: 인기 영화, 평점 높은 영화, 개봉 예정 영화 카테고리별 조회
- 🔍 **영화 상세 정보**: 각 영화의 상세 정보 및 포스터 확인
- 🌐 **리뷰 번역**: 영화 리뷰를 자동으로 한국어로 번역
- ❤️ **즐겨찾기 관리**: 사용자별 영화 즐겨찾기 추가/삭제
- 👤 **사용자 인증**: 회원가입, 로그인, 로그아웃 기능
- 📱 **반응형 디자인**: 다양한 디바이스에서 최적화된 사용자 경험

## 🛠️ 기술 스택

### Frontend
- **React 19.0.0** - 사용자 인터페이스 구축
- **React Router DOM** - 클라이언트 사이드 라우팅
- **Redux Toolkit** - 상태 관리
- **React Bootstrap** - UI 컴포넌트
- **Axios** - HTTP 클라이언트
- **React Multi Carousel** - 슬라이더 컴포넌트

### Backend
- **Node.js** - 서버 런타임
- **Express.js** - 웹 프레임워크
- **MySQL2** - 데이터베이스
- **Bcrypt** - 비밀번호 암호화
- **CORS** - 크로스 오리진 요청 처리

### API
- **TMDB API** - 영화 데이터 제공
- **Google Translate API** - 영화 리뷰 번역 (영어 → 한국어)

## 📁 프로젝트 구조

```
popcorn-party-platform/
├── backend/                 # 백엔드 서버
│   ├── routes/             # API 라우트
│   │   ├── auth.js         # 인증 관련 API
│   │   ├── favorites.js    # 즐겨찾기 관련 API
│   │   └── index.js        # 기본 라우트
│   ├── db.js              # 데이터베이스 연결
│   └── server.js          # 서버 설정
├── src/                    # 프론트엔드 소스코드
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── Banner.js       # 메인 배너
│   │   ├── MovieCard.js    # 영화 카드
│   │   ├── MovieSlide.js   # 영화 슬라이더
│   │   └── Navibar.js      # 네비게이션 바
│   ├── pages/              # 페이지 컴포넌트
│   │   ├── Home.jsx        # 홈페이지
│   │   ├── Movies.jsx      # 영화 목록
│   │   ├── MovieDetail.jsx # 영화 상세
│   │   ├── Favorite.jsx    # 즐겨찾기
│   │   ├── Login.jsx       # 로그인
│   │   └── Join.jsx        # 회원가입
│   ├── redux/              # Redux 상태 관리
│   │   ├── store.js        # Redux 스토어
│   │   └── reducers/       # 리듀서
│   └── api.js              # API 설정
└── public/                 # 정적 파일
```

## 🚀 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/popcorn-party-platform.git
cd popcorn-party-platform
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# TMDB API 키
REACT_APP_API_ACCESS_TOKEN=your_tmdb_api_token

# Google Translate API 키
REACT_APP_GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key

# 데이터베이스 설정
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=popcorn_party
```

### 4. 데이터베이스 설정

```sql
CREATE DATABASE popcorn_party;

USE popcorn_party;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  movie_title VARCHAR(255) NOT NULL,
  movie_poster VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_movie (user_id, movie_id)
);
```

### 5. 애플리케이션 실행

#### 개발 모드
```bash
# 프론트엔드 실행 (터미널 1)
npm start

# 백엔드 실행 (터미널 2)
cd backend
node server.js
```

#### 프로덕션 모드
```bash
# 빌드
npm run build

# 프로덕션 서버 실행
cd backend
node server.js
```

## 📱 사용법

1. **회원가입/로그인**: 웹사이트에 접속하여 계정을 생성하거나 로그인합니다.
2. **영화 탐색**: 홈페이지에서 인기 영화, 평점 높은 영화, 개봉 예정 영화를 확인합니다.
3. **영화 상세보기**: 관심 있는 영화를 클릭하여 상세 정보를 확인합니다.
4. **즐겨찾기 관리**: 마음에 드는 영화를 즐겨찾기에 추가하거나 제거합니다.

## 🔧 API 엔드포인트

### 인증
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인

### 즐겨찾기
- `GET /api/favorites` - 즐겨찾기 목록 조회
- `POST /api/favorites` - 즐겨찾기 추가
- `DELETE /api/favorites/:id` - 즐겨찾기 삭제
