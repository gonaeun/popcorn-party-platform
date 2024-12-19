const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) => {
  console.log('main router!');
  res.sendFile(path.join(__dirname,'..','..','frontend','build','index.html'));
  // index.html로 정적파일 경로 연결
})

router.post('/getData', (req, res) => {
  console.log('Form으로 요청이 들어옴', req.body.data);
  res.send({ result: "success" });
});

module.exports = router