import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Favorite.css';
import tmdbApi from '../api'

const Favorite = ({ userId = 1 }) => {
  const [favorites, setFavorites] = useState([]);
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    // TMDB 장르 데이터 가져오기
    const fetchGenres = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key={tmdbApi}&language=ko-KR'); // YOUR_API_KEY를 실제 TMDB API 키로 교체
        setGenreList(response.data.genres);
      } catch (error) {
        console.error('장르 데이터 가져오기 실패:', error);
      }
    };

    // 사용자 찜 목록 가져오기
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/favorites/${userId}`);
        setFavorites(response.data);
      } catch (error) {
        console.error('찜 목록 가져오기 실패:', error);
      }
    };

    fetchGenres();
    fetchFavorites();
  }, [userId]);

  // 숫자로 저장된 장르를 이름으로 변환
  const getGenreNames = (genreIds) => {
    if (!genreList.length) return [];
    return genreIds.split(', ').map((id) => {
      const genre = genreList.find((g) => g.id === parseInt(id, 10));
      return genre ? genre.name : null;
    }).filter(Boolean).join(' / '); // 장르 이름을 '/'로 연결
  };

  return (
    <div className="favorite-wrapper">
      <h2 className="favorite-header">내가 찜한 영화 목록</h2>
      <div className="favorite-movie-list">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <div
              className="favorite-movie-card"
              key={movie.movie_id}
              style={{
                backgroundImage: `url(https://www.themoviedb.org/t/p/w500${movie.poster_path})`,
              }}
            >
              <div className="favorite-overlay">
                <h3>{movie.title}</h3>
                <div className="genre">
                  {getGenreNames(movie.genre)}
                </div>
                <div className="info">
                  <p>평점: {movie.vote_average || 0}점</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-favorites">찜한 영화가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Favorite;
