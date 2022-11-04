//몽고디비 자바형식으로 구성되어 아무값이나 넣을수 있으므로 스키마로 강제함.
//스키마 : 데이터베이스에 저장될 자료형식이나 키값을 강제하는 시스템적인 틀
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model('Post', postSchema);
module.exports = { Post };