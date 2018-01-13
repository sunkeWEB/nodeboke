let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/population');

let Schema = mongoose.Schema;
let userSchema = new Schema({
    name: String,
    age: Number,
    posts: [{type: Schema.Types.ObjectId, ref: 'post'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
});
let User = mongoose.model('user', userSchema);

let postSchema = new Schema({
    title: String,
    content: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
});
let Post = mongoose.model('post', postSchema);

let commentSchema = new Schema({
    content: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'}
});
let Comment = mongoose.model('comment', commentSchema);

exports.User = User;
exports.Post = Post;
exports.Comment = Comment;