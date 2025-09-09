// JWT 토큰 관련 유틸리티 함수들

/**
 * JWT 토큰에서 사용자 ID를 추출하는 함수
 * @param {string} token - JWT 토큰
 * @returns {number|null} - 사용자 ID 또는 null
 */
export const getUserIdFromToken = (token) => {
  try {
    if (!token) return null;
    
    // JWT 토큰 디코딩 (payload 부분만)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id || null;
  } catch (error) {
    console.error('토큰 디코딩 실패:', error);
    return null;
  }
};

/**
 * 로컬 스토리지에서 토큰을 가져와 사용자 ID를 반환하는 함수
 * @returns {number|null} - 사용자 ID 또는 null
 */
export const getCurrentUserId = () => {
  const token = localStorage.getItem('token');
  return getUserIdFromToken(token);
};

/**
 * 토큰이 유효한지 확인하는 함수
 * @param {string} token - JWT 토큰
 * @returns {boolean} - 토큰 유효성
 */
export const isTokenValid = (token) => {
  try {
    if (!token) return false;
    
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    // 토큰 만료 시간 확인
    return payload.exp > currentTime;
  } catch (error) {
    console.error('토큰 유효성 검사 실패:', error);
    return false;
  }
};

/**
 * 로그인 상태를 확인하는 함수
 * @returns {boolean} - 로그인 여부
 */
export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return token && isTokenValid(token);
};
