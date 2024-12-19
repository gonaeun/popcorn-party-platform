const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../db'); 
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  console.log('main router!');
  res.sendFile(path.join(__dirname,'..','..','frontend','build','index.html'));
  // index.html로 정적파일 경로 연결
})

router.post('/getData', (req, res) => {
  console.log('Form으로 요청이 들어옴', req.body.data);
  res.send({ result: "success" });
});

// 회원가입 처리
router.post('/register', async (req, res) => {
  const { username, nickname, password, phoneNumber } = req.body;

  try {
    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 데이터베이스에 회원 정보 삽입
    const [result] = await db.query(
      'INSERT INTO users (username, nickname, password, phone_number) VALUES (?, ?, ?, ?)',
      [username, nickname, hashedPassword, phoneNumber]
    );

    console.log('회원가입 성공:', result);
    res.send({ result: '회원가입 성공' });
  } catch (error) {
    console.error('회원가입 오류:', error);
    res.status(500).send({ error: '회원가입 실패' });
  }
});

module.exports = router