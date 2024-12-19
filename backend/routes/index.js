const express = require('express');
const router = express.Router();
const path = require('path');

// 메인 페이지 라우트
router.get('/', (req, res) => {
  console.log('main router!');
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'build', 'index.html'));
});

// 기타 테스트 라우트
router.post('/getData', (req, res) => {
  console.log('Form으로 요청이 들어옴', req.body.data);
  res.send({ result: "success" });
});

module.exports = router;
