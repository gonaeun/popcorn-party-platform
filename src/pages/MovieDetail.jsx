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
    // 프로그램 내 번역 로직
    try {
      const response = await fetch("https://translation.googleapis.com/language/translate/v2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_API_KEY`,  // 유효한 api 코드 입력하기
        },
        body: JSON.stringify({
          q: text,
          target: "ko",
        }),
      });
      const data = await response.json();
      console.log("번역 API 응답:", data); // 디버깅용 출력
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error("번역 중 오류 발생:", error);
      return text; // 번역 실패 시 원문 반환
    }
  };

  const getReviews = async () => {
    try {
      const res = await tmdbApi.get(`/movie/${id}/reviews?language=en-US&page=1`);
      const translatedReviews = await Promise.all(
        res.data.results.map(async (item) => ({
          ...item,
          content: await translateReview(item.content), // 번역된 리뷰
        }))
      );
      setReview(translatedReviews);
    } catch (error) {
      console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
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
                {review.map((item)=>(
                  <div className='review-item' key={item.id}>
                    <h4>{item.author}</h4>
                    <p>{item.content}</p>
                  </div>
                ))}
        </Col>
      </Row>
    </Container>
  )
}

export default MovieDetail