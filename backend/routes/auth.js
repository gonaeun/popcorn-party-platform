const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// 로그인 처리
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await pool.query(query, [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
    }

    const token = jwt.sign(
        { id: user.id },
        'your_secret_key',
        { expiresIn: '1h' }
    );

    res.status(200).json({ token, message: '로그인 성공' });
  } catch (error) {
    console.error('로그인 실패:', error);
    res.status(500).json({ message: '로그인 처리 중 오류가 발생했습니다.' });
  }
});

// 회원가입 처리
router.post('/register', async (req, res) => {
  const { username, nickname, password, phoneNumber } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, nickname, password, phone_number) VALUES (?, ?, ?, ?)';
    const [result] = await pool.query(query, [username, nickname, hashedPassword, phoneNumber]);

    console.log('회원가입 성공:', result);
    res.status(201).json({ message: '회원가입 성공' });
  } catch (error) {
    console.error('회원가입 실패:', error);
    res.status(500).json({ message: '회원가입 처리 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
