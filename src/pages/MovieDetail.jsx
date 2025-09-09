import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { tmdbApi } from '../api';
import Container from 'react-bootstrap/esm/Container'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Badge from 'react-bootstrap/esm/Badge'

const MovieDetail = () => {

  const {id} = useParams()
  const [movieInfo, setMovieInfo] = useState({})
  // map함수를 부를 때 movieInfo.genres값이 undefined인 경우 때문에 오류가 발생
  // 해결책 1. 초기값을 useState({genres: []})로 >> genres는 항상 배열이므로 오류가 발생하지 않음
  // 해결책 2. 초기값은 그대로 두고, map함수 앞에 물음표 함수 적어주기 (movieInfo.genres가 정의되고 배열인 경우에만 map함수가 호출되도록)
  const [review, setReview] = useState([])
  const [isTranslating, setIsTranslating] = useState(false)

  const getMovieInfo = async () =>{
    let res = await tmdbApi.get(`/movie/${id}?language=ko-KR`)   //axios 객체를 api라는 이름으로 저장해뒀음

    setMovieInfo(res.data)
  }

  // const getReviews = async ()=>{
  //   let res = await api.get(`/movie/${id}/reviews?language=en-US&page=1`)
  //   setReview(res.data.results)
  //   console.log(res.data.results);
  // }


  const translateReview = async (text) => {
    // Google Translate API를 사용하여 영어 리뷰를 한국어로 번역
    try {
      const apiKey = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;
      
      // API 키가 없으면 원문 반환
      if (!apiKey) {
        console.warn("Google Translate API 키가 설정되지 않았습니다. 원문을 반환합니다.");
        return text;
      }

      // Google Translate API 호출
      const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,           // 번역할 텍스트
          target: "ko",      // 목표 언어: 한국어
          source: "en",      // 소스 언어: 영어
        }),
      });

      // API 응답 상태 확인
      if (!response.ok) {
        throw new Error(`번역 API 오류: ${response.status}`);
      }

      const data = await response.json();
      console.log("번역 API 응답:", data); // 디버깅용 출력
      
      // 번역 결과 추출
      if (data.data && data.data.translations && data.data.translations.length > 0) {
        return data.data.translations[0].translatedText;
      } else {
        console.warn("번역 결과가 없습니다. 원문을 반환합니다.");
        return text;
      }
    } catch (error) {
      console.error("번역 중 오류 발생:", error);
      return text; // 번역 실패 시 원문 반환
    }
  };

  const getReviews = async () => {
    try {
      setIsTranslating(true);
      
      // TMDB API에서 영어 리뷰 데이터 가져오기
      const res = await tmdbApi.get(`/movie/${id}/reviews?language=en-US&page=1`);
      
      // 리뷰가 없으면 빈 배열로 설정
      if (res.data.results.length === 0) {
        setReview([]);
        setIsTranslating(false);
        return;
      }

      // 모든 리뷰를 Google Translate API로 한국어 번역
      const translatedReviews = await Promise.all(
        res.data.results.map(async (item) => ({
          ...item,
          content: await translateReview(item.content), // 영어 리뷰를 한국어로 번역
        }))
      );
      setReview(translatedReviews);
    } catch (error) {
      console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  useEffect(()=>{
    getMovieInfo()
    getReviews()
  },[])

  return (
    <Container className='movie-details'>
      <Row>
        <Col className='poster'>
          <img src={`https://image.tmdb.org/t/p/original${movieInfo.poster_path}`} alt='포스터 이미지'/>
        </Col>
        <Col className='info'>
          <div className='genre'>
            {movieInfo.genres?.map((genre)=>(
              <Badge key={genre.id} bg='danger'>{genre.name}</Badge>
            ))}
          </div>
          <h1>{movieInfo.title}</h1>
          <h4>{movieInfo.tagline}</h4>
          <div>
            <span>{movieInfo.release_date}</span>
            <span>{movieInfo.runtime}분</span>
            <span>평점:{movieInfo.vote_average}점</span>
            <span>{movieInfo.adult ? "청불":"청소년"}</span>
          </div>
          <div className='overview'>
          {movieInfo.overview}
          </div>
        </Col>
      </Row>
      <Row>
        <Col className='container review-box'>
          <h3>영화 리뷰</h3>
          {isTranslating ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">번역 중...</span>
              </div>
              <p className="mt-2">리뷰를 번역하고 있습니다...</p>
            </div>
          ) : review.length > 0 ? (
            review.map((item) => (
              <div className='review-item' key={item.id}>
                <h4>{item.author}</h4>
                <p>{item.content}</p>
                <small className="text-muted">번역된 리뷰</small>
              </div>
            ))
          ) : (
            <p className="text-muted">리뷰가 없습니다.</p>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default MovieDetail