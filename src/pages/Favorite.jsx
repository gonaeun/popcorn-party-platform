import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Favorite.css';

const Favorite = ({ userId, isLoggedIn }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로그인하지 않은 경우 처리
    if (!isLoggedIn || !userId) {
      setLoading(false);
      return;
    }

    // 사용자 찜 목록 가져오기
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/api/favorites/${userId}`);
        setFavorites(response.data);
      } catch (error) {
        console.error('찜 목록 가져오기 실패:', error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId, isLoggedIn]);

  // 로그인하지 않은 경우
  if (!isLoggedIn) {
    return (
      <div className="favorite-wrapper">
        <h2 className="favorite-header">내가 찜한 영화 목록</h2>
        <div className="favorite-movie-list">
          <div className="login-required">
            <p>로그인이 필요한 서비스입니다.</p>
            <button 
              className="login-button"
              onClick={() => window.location.href = '/login'}
            >
              로그인하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 로딩 중인 경우
  if (loading) {
    return (
      <div className="favorite-wrapper">
        <h2 className="favorite-header">내가 찜한 영화 목록</h2>
        <div className="favorite-movie-list">
          <div className="loading">
            <p>찜한 영화를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

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
