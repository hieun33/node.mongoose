const express = require('express');
const router = express.Router();
const { User } = require('../model/userSchema');
const { Counter } = require('../model/counterSchema');

router.post('/join', (req, res) => {    //조인으로 들어오는 값
    const temp = req.body;

    //join요청이 들어오면 카운터 모델에서 userNum을 가져옴
    Counter.findOne({name: 'counter'}).then(doc => {
         //userNum값을 bodyParser객체랑 합쳐서 유저모델에 저장
        temp.userNum = doc.userNum; 

        const userData = new User(temp);
        userData.save()
            .then(()=>{
                 //카운터 모델에서 userNum값을 1증가하고 성공응답전달
                 Counter.updateOne({name: 'counter'},{ $inc: {userNum:1}})
                  .then(()=>[
                    res.json({success : true})
                  ])
            })
            .catch(err =>{
                console.log(err);
                res.json({success: false})
              })
    })
    
   


});

module.exports = router;
