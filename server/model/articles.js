const mongoose = require('mongoose');
let Schema = mongoose.Schema;
//定义模型字段  跟数据库匹配
let CommentSchema = new mongoose.Schema({
    post      : { type: Schema.Types.ObjectId, ref: "Post" },
    commenter : { type: Schema.Types.ObjectId, ref: 'User' },
    content   : String
},{ versionKey: false});

module.exports = mongoose.model('comment', CommentSchema);