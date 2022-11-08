const express = require('express');
const router = express.Router();

const { Post } = require('../model/postSchema.js');
const { Counter } = require('../model/counterSchema.js');
const { User } = require('../model/userSchema');



//DB에 create
router.post('/create', (req, res) => {
    const temp = req.body;
    //counter모델로부터 communityNum 값을 찾아서 프론트에서 전달받은 데이터에 추가
    // 이때 counter모델에 findone메서드로 찾을 document의 조건 설정
    Counter.findOne({name: 'counter'})
    .exec()       
    .then(doc=>{
      //기존 프론트에서 받은 데이터에 방금 파라미터로 전달받은 document에 communityNum값 추가적용
      temp.communityNum = doc.communityNum;

      //현재 로그인된 사용자의 아이디로 user컬렉션으로부터 document를 찾고
      User.findOne({uid: temp.uid}).exec()
      .then(doc =>{
        //해당 document의 object.id값을 bodyParser객체에 writer키값에 등록
        temp.writer = doc._id;

        //위에서 만들어진 최종 temp객체로 PostMedel인스턴스 생성후 DB에 저장
       const PostModel = new Post(temp);
       PostModel.save().then(()=>{
          Counter.updateOne({name: 'counter'}, {$inc: {communityNum : 1}})
           .then(()=>{
            res.json({success: true})
           })
       })
      })
      
    })
    .catch(err=>console.log(err))
  
});
  
  
  //db상의 데이터 read
router.post('/read', (req,res)=>{
    Post.find()
    .populate('writer')
    .exec() //실행
    .then(doc=>{
      res.json({success:true, communityList: doc})
    })
    .catch(err=>{
      console.log(err);
      res.json({success:false})
    })
})
  
  //detail
router.post('/detail', (req, res) => {
  Post.findOne({ communityNum: req.body.num }).populate('writer').exec()
      .then(doc => {
        res.json({ success: true, detail: doc });
      })
      .catch(err => {
        console.log(err);
        res.json({ success: false });
      })
})

//edit
router.post('/edit', (req,res)=> {
  const temp = {
    title : req.body.title,
    content: req.body.content
  }
  Post.updateOne({communityNum: req.body.num}, { $set: temp })    //첫번째객체 , 두번째객체
  .exec()
    .then(()=>{
      res.json({success: true})
    })
    .catch(err=>{
      console.log(err);
      res.json({success: false})
    })
  
})

//delete

router.post('/delete', (req, res) => {
  console.log(req.body.num);
  Post.deleteOne({ communityNum: req.body.num }).exec()
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false })
    })
})


module.exports = router;