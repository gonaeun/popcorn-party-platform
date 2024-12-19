import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Favorite.css';

const Favorite = ({ userId = 1 }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // 사용자 찜 목록 가져오기
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/favorites/${userId}`);
        setFavorites(response.data);
      } catch (error) {
        console.error('찜 목록 가져오기 실패:', error);
      }
    };

    fetchFavorites();
  }, [userId]);

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
