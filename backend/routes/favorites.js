const express = require('express');
const pool = require('../db'); // MySQL 연결
const router = express.Router();

// 찜 목록 저장
router.post('/favorites', async (req, res) => {
  const { user_id, movie_id, title, genre, release_date, overview, poster_path } = req.body;

  try {
    const query = `
      INSERT INTO favorites (user_id, movie_id, title, genre, release_date, overview, poster_path)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        genre = VALUES(genre),
        release_date = VALUES(release_date),
        overview = VALUES(overview),
        poster_path = VALUES(poster_path)
    `;
    await pool.query(query, [user_id, movie_id, title, genre, release_date, overview, poster_path]);
    res.status(200).send({ message: '찜 목록에 추가되었습니다' });
  } catch (error) {
    console.error('찜 저장 실패:', error);
    res.status(500).send({ error: '찜 저장 실패' });
  }
});

module.exports = router;
