const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

const { Post } = require('./model/postSchema.js')
// 스키마 모델을 불러오면 자동으로 mongoDB에 빈 컬렉션이 추가됨
// 카운터 컬렉션에 초기 데이터가 들어갈 첫 document를 몽고 DB상에 직접 생성
// {name: 'counter', communityNum: 1, }
const { Counter } = require('./model/counterSchema.js'); //카운터스키마 가져옴

//express에서 react안쪽 build폴더까지의 경로를 static으로 지정
app.use(express.static(path.join(__dirname, '../react/build')));

  
//클라이언트에서 보내는 데이터를 받도록 설정 (body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//몽구스 이용 디비접속
app.listen(port, () => {
  mongoose
    .connect('mongodb+srv://hieun33:abcd1234@cluster0.aclgiow.mongodb.net/?retryWrites=true&w=majority')
    //접속 성공시
    .then(() => console.log(`Server app listening on port ${port} with MongoDB`))
    //접속 실패시
    .catch(err => console.log(err));
})

///-----------여기까지가 노드 빌드


app.get('/', (req, res) => {
  //서버에서 5000포트로 접속하면 static폴더로 지정되어 있는 build안쪽의 index.html을 화면에 내보냄
  res.sendFile(path.join(__dirname, '../react/build/index.html'));
})


//어떤 URL에서 접속하더라도 화면이 뜨도록 설정
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../react/build/index.html'));
})


//DB에 create
app.post('/api/create', (req, res) => {
  console.log(req.body);

  //포스트모델로부터 인스턴스 만들어서
  const PostModel = new Post({
    title: req.body.title,
    content: req.body.content
  })

  //포스트에 저장되고반환.
  PostModel.save()
    .then(() => {
      res.json({ success: true })
    })
    .catch(err => {
      res.json({ success: false })
    })

})


//db상의 데이터 read
app.post('/api/read', (req,res)=>{
  Post.find()
  .exec() //실행
  .then(doc=>{
    res.json({success:true, communityList: doc})
  })
  .catch(err=>{
    console.log(err);
    res.json({success:false})
  })
})

//   mongodb+srv://hieun33:abcd1234@cluster0.aclgiow.mongodb.net/?retryWrites=true&w=majority