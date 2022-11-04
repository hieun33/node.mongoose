const express = require('express');
const router = express.Router();

const { Post } = require('../model/postSchema.js');
const { Counter } = require('../model/counterSchema.js');



//DB에 create
router.post('/create', (req, res) => {
    //counter모델로부터 communityNum 값을 찾아서 프론트에서 전달받은 데이터에 추가
    // 이때 counter모델에 findone메서드로 찾을 document의 조건 설정
    Counter.findOne({name: 'counter'})
    .exec()       
    .then(doc=>{
      //기존 프론트에서 받은 데이터에 방금 파라미터로 전달받은 document에 communityNum값 추가적용
      const Postmedel = new Post({
        title: req.body.title,
        content: req.body.content,
        communityNum: doc.communityNum
  
      });
      //위에서 생성된 모델 인스턴스를 DB에 저장
      Postmedel.save()
      .then(()=>{         //첫번재모델저장후 다름꺼가져와서 또 저장
        //성공적으로 post모델이 저장되면 기존 카운터의 communityNum값을 1증가해서 document 업데이트
        //update에서 자주쓰는 수정방식 3가지 $inc(기존값증가) $dec(기존값감소) $set(새로운값으로 변경)
        Counter.updateOne({ name: 'counter' },{ $inc: { communityNum : 1 }})
        .then(() => {
          res.json({ success : true })
        })
      })
    })
    .catch(err=>console.log(err))
  
});
  
  
  //db상의 데이터 read
router.post('/read', (req,res)=>{
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
  
  //detail
router.post('/detail', (req, res) => {
    Post.findOne({ communityNum: req.body.num }).exec()
      .then(doc => {
        res.json({ success: true, detail: doc });
      })
      .catch(err => {
        console.log(err);
        res.json({ success: false });
      })
})

module.exports = router;