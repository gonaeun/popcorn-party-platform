import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MovieCard = ({ data }) => {   // MovieSlide에서 data를 props로 받기

  const [isFavorite, setIsFavorite] = useState(false); // 하트 상태 관리
  const genreList = useSelector(state => state.movie.genreList)
  
  const handleFavoriteClick = async () => {
    setIsFavorite(!isFavorite); // 하트 상태 토글
    if (!isFavorite) {
      // 를 클릭하면 favorite 목록에 저장
      try {
        await axios.post('http://localhost:3001/api/favorites', {
          user_id: 1, // 로그인한 사용자 ID (예시)
          movie_id: data.id,
          title: data.title,
          genre: data.genre_ids.join(', '), // 장르 리스트를 문자열로 저장
          release_date: data.release_date,
          overview: data.overview,
          poster_path: data.backdrop_path,
        });
        console.log('찜 목록에 추가됨');
      } catch (error) {
        console.error('찜 저장 실패:', error);
      }
    }
  };

  console.log("[MovieCard]:", data);

  const div_styled = {
    backgroundImage: `url(https://www.themoviedb.org/t/p/w500${data.backdrop_path})`,
    backgroundRepeat: 'no-repeat', // 모자이크 배열 사라짐
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  
  
  return (
    <div className="movie-card" style={div_styled}>
      <div
        className={`heart-icon ${isFavorite ? 'active' : ''}`}
        onClick={handleFavoriteClick}
      >
        ❤️
      </div>
      <Link to={`/movies/${data.id}`}>
        <div className="overlay">
          <h1>{data.title}</h1>
          <div className="genre">
            {data.genre_ids.map((id) => (
              <Badge bg="danger" key={id}>
                {genreList.find((genre) => genre.id === id)?.name}
              </Badge>
            ))}
          </div>
          <div className="info">
            평점: {data.vote_average}점 | {data.adult ? '청불' : '청소년'}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;