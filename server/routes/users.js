const express = require('express');
const router = express.Router();
const model = require('./../model/db');
const Users = model.getModel('users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',(req,res)=>{
    const {user, pwd} = req.body;
    Users.findOne({user,pwd},{__v:0,pwd:0},(err,doc)=>{
        if (doc) {
            res.cookie('userid',doc._id);
            res.json({
                code:0,
                msg:"登陆成功",
                data:doc
            });
        }else{
            res.json({
                code:1,
                msg:"账号或者密码错误",
                data:[]
            });
        }
    })
});

router.get('/info', (req, res) => {
    const {userid} = req.cookies;
    Users.findOne({_id: userid}, {__v: 0, pwd: 0}, (err, doc) => {
        if (doc) {
            return res.json({
                code: 0,
                msg: '获取用户数据成功',
                data: doc
            });
        } else {
            return res.json({
                code: 1,
                msg: '没找到用户相关数据'
            });
        }
    });
});

module.exports = router;