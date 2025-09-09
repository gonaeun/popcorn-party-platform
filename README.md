# 🍿 Popcorn Party Platform

> 넷플릭스 스타일의 영화 플랫폼

## 📋 프로젝트 개요
- **개인 프로젝트** (기여도 100%)
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

## 🚀 프로젝트 구현 기능

### Frontend 구현
- **React 19.0.0 기반 SPA**: 컴포넌트 기반 아키텍처로 재사용성과 유지보수성 확보
- **반응형 웹 디자인**: Bootstrap과 CSS Grid/Flexbox를 활용하여 모바일, 태블릿, 데스크톱 환경에서 일관된 UI/UX 제공
- **Redux Toolkit 상태 관리**: 전역 상태를 효율적으로 관리하여 컴포넌트 간 데이터 흐름 최적화
- **React Router DOM**: 클라이언트 사이드 라우팅으로 SPA의 빠른 페이지 전환 구현

### Backend 구현
- **Node.js + Express.js**: RESTful API 설계로 확장 가능한 서버 아키텍처 구축
- **JWT 기반 인증 시스템**: 세션·쿠키 대신 토큰 기반 인증으로 보안성과 확장성 향상
- **Bcrypt 암호화**: 사용자 비밀번호를 안전하게 해시화하여 저장
- **MySQL2 데이터베이스**: 관계형 데이터베이스로 사용자 정보와 즐겨찾기 데이터 관리

### API 연동 및 데이터 처리
- **TMDB API 실시간 연동**: Promise.all()을 활용한 병렬 API 호출로 67% 성능 향상 (9초→3초)
- **Google Translate API**: 한국어 사용자를 위한 TMDB 데이터 번역
- **Axios HTTP 클라이언트**: 인터셉터와 에러 핸들링을 통한 안정적인 API 통신

### 데이터베이스 설계
- **정규화된 테이블 구조**: users, favorites 테이블로 효율적인 데이터 관리
- **외래키 제약조건**: 데이터 무결성 보장 및 CASCADE 삭제로 데이터 일관성 유지
- **인덱스 최적화**: 사용자 ID와 영화 ID 조합으로 빠른 조회 성능 확보

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
- **Google Translate API** - 영화 리뷰 번역

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

## 🛠️ 트러블슈팅

### 초기 데이터 패칭 지연 문제

#### 문제 인식
- 메인 화면에서 TMDB의 인기/평점/개봉예정 데이터를 순차적으로 호출하면 총 로딩 시간이 30초로 너무 길었음
- 각 API 호출이 직렬로 수행되면서 네트워크 대기 시간이 누적되어 초기화면 표시가 지연된 것

```javascript
// 순차 처리 (기존의 느린 방식)
const popularApi = await tmdbApi.get('/movie/popular?language=ko-KR&page=1'); 
const topRatedApi = await tmdbApi.get('/movie/top_rated?language=ko-KR&page=1');
const upcomingApi = await tmdbApi.get('/movie/upcoming?language=ko-KR&page=1');
```

#### 문제점
- **로딩 시간 지연**: 각 API 호출이 직렬로 수행되면서 네트워크 대기 시간이 누적
- **사용자 경험 악화**: 초기화면 표시가 30초나 지연되어 사용자 이탈 증가
- **리소스 비효율**: 네트워크 대역폭을 순차적으로만 사용

#### 해결 전략
`Promise.all()`을 활용하여 3개의 API를 병렬로 호출하여 네트워크 요청을 동시에 처리:

```javascript
// 병렬 처리 (더 빠르게 리팩토링)
const popularApi = tmdbApi.get('/movie/popular?language=ko-KR&page=1'); 
const topRatedApi = tmdbApi.get('/movie/top_rated?language=ko-KR&page=1');
const upcomingApi = tmdbApi.get('/movie/upcoming?language=ko-KR&page=1');
const genreApi = tmdbApi.get('/genre/movie/list?language=ko');

const [popular, topRated, upcoming, genre] = await Promise.all([popularApi, topRatedApi, upcomingApi, genreApi]);

// Redux에 일괄 반영
dispatch(initData({
  p: popular.data.results,
  t: topRated.data.results,
  u: upcoming.data.results,
  g: genre.data.genres
}));
```

#### 개선 효과
- **로딩 시간 단축**: 9초 → 3초로 67% 성능 향상
- **사용자 체감 속도 개선**: 초기 화면 표시 시간 대폭 단축
- **일괄된 오류 처리**: 일부 API 실패 시에도 나머지 데이터는 정상 표시
- **서비스 안정성 확보**: 통합된 오류 처리 로직으로 안정성 향상

### JWT 기반 개인화 인증 시스템 구현

#### 문제 상황
JWT 기반 인증은 구현되어 있었으나, 토큰에서 사용자 ID를 추출하여 개인별 즐겨찾기 목록을 구분하는 로직이 없어서 모든 사용자가 동일한 즐겨찾기 목록을 보는 문제 발생. 하드코딩된 사용자 ID로 인해 로그인 여부와 관계없이 항상 동일한 데이터가 표시되었음.

#### 해결 방법
JWT 토큰에서 사용자 ID를 추출하는 유틸리티 함수를 생성하고, 동적 사용자 인증 시스템을 구현했습니다.

- **JWT 토큰 디코딩 함수 구현**: 토큰에서 사용자 ID를 안전하게 추출하는 유틸리티 함수 개발
  - `atob()` 함수를 사용하여 JWT payload 디코딩
  - 에러 핸들링을 통한 안전한 토큰 처리
  - 토큰 유효성 검사 및 만료 시간 확인 로직 구현

- **동적 사용자 ID 관리**: 하드코딩된 사용자 ID를 제거하고 JWT 토큰 기반으로 동적 관리
  - `useState`와 `useEffect`를 활용한 실시간 사용자 상태 관리
  - 로그인/로그아웃 시 자동으로 사용자 ID 업데이트
  - 토큰 변경 시 즉시 반영되는 반응형 상태 관리

- **인증 상태 기반 접근 제어**: 로그인하지 않은 사용자는 개인 데이터에 접근할 수 없도록 구현
  - 컴포넌트 레벨에서 인증 상태 검증
  - 조건부 렌더링을 통한 접근 제어
  - 로그인 유도 UI와 리다이렉트 로직 구현

#### 개선 효과
- **개인화된 사용자 경험**: 각 사용자별 고유한 즐겨찾기 목록 제공
- **보안 강화**: 로그인하지 않은 사용자는 개인 데이터에 접근 불가
- **동적 인증**: JWT 토큰 기반으로 실시간 사용자 상태 관리
- **사용자 경험 개선**: 로그인 유도 및 로딩 상태 표시
