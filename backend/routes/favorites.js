const express = require('express');
const pool = require('../db');
const router = express.Router();

// 찜 목록 저장 (POST 요청)
router.post('/', async (req, res) => {
  const {
    user_id,
    movie_id,
    title,
    genre,
    release_date,
    overview,
    poster_path,
    vote_average
  } = req.body;

  try {
    const query = `
      INSERT INTO favorites (user_id, movie_id, title, genre, release_date, overview, poster_path, vote_average)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        genre = VALUES(genre),
        release_date = VALUES(release_date),
        overview = VALUES(overview),
        poster_path = VALUES(poster_path),
        vote_average = VALUES(vote_average)
    `;
    // vote_average가 null일 가능성을 처리
    const processedVoteAverage = vote_average !== undefined ? Number(vote_average) : null;
    const values = [
      user_id,
      movie_id,
      title,
      genre,
      release_date,
      overview,
      poster_path,
      processedVoteAverage
    ];

    await pool.query(query, values);

    res.status(200).send({ message: '찜 목록에 추가되었습니다' });
  } catch (error) {
    console.error('찜 저장 실패:', error);
    res.status(500).send({ error: '찜 저장 실패' });
  }
});

// 찜한 영화 목록 가져오기 (GET 요청)
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const query = 'SELECT * FROM favorites WHERE user_id = ?';
    const [rows] = await pool.query(query, [userId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('찜한 영화 목록 가져오기 실패:', error);
    res.status(500).send({ error: '찜한 영화 목록을 가져오는 데 실패했습니다.' });
  }
});

module.exports = router;
