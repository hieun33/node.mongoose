const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    name: String,
    communityNum: Number,       //해당값을 올리면서 리스트넘버생성
},{collection:'Counter'})

const Counter = mongoose.model('Counter', counterSchema);
module.exports = { Counter }
