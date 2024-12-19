const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// 로그인 처리
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // db에서 사용자 정보 확인
    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await pool.query(query, [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
    }

    const user = rows[0];

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
        { id: user.id }, // 토큰에 포함할 정보(PayLoad)
        'your_secret_key', // 비밀키
        { expiresIn: '1h' } // 토큰 만료 시간
    );

    // 클라이언트로 토큰 전달
    res.status(200).json({ token, message: '로그인 성공' });
  } catch (error) {
    console.error('로그인 실패:', error);
    res.status(500).json({ message: '로그인 처리 중 오류가 발생했습니다.' });
  }
});

module.exports = router;