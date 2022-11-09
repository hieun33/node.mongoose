//몽고디비 자바형식으로 구성되어 아무값이나 넣을수 있으므로 스키마로 강제함.
//스키마 : 데이터베이스에 저장될 자료형식이나 키값을 강제하는 시스템적인 틀
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,       //title,content는 메인에서 가져오기
  content: String,
  communityNum: Number,      //counterschema에 있는거 가져옴
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  } 
},{ collection: 'Posts', timestamps: true });

//{collection: 'Posts'} 몽고디비에 새로운 컬렉션 생성

const Post = mongoose.model('Post', postSchema);
module.exports = { Post };